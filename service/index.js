// Third Party Modules
const express = require('express');
const cookieParser = require('cookie-parser');
const db  = require('./database.js');
const { webSocketInit } = require('./websocket.js');

const authCookieName = 'auth';
const app = express();

// Using the following middleware:
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy (for debugging)
app.set('trust proxy', true);

// Global router for all requests
const appRouter = express.Router();
app.use('/app', appRouter)

// Authentication endpoints - Login and account creation
appRouter.get('/login/:username/:password', async (req, res) => {
    const username = req.params.username
    const password =  req.params.password
    if (username && password) {
        let response = await db.authenticateUser(username, password)
        setAuthCookie(res, response.token);
        res.send(response);
    } else {
        res.status(500).send({error: "Please submit a username and password"});
    }
});

appRouter.get('/bycookie', async (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    if (cookies['auth']) {
        let response = await db.getUserByAuthToken(cookies['auth'])
        if (response.username){
            res.send({username: response.username});
        }
    }
    else {
        res.status(500).send({error: "Invalid auth token"});
    }
});


appRouter.post('/create', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (await db.getUserByEmail(email)) {
        res.status(409).send({error: "Existing user. Please use another email."})
    } else if (await db.getUserByUsername(username)) {
        res.status(409).send({error: "Existing user. Please use another username."})
    } else {
        if (username && password && email) {
            setAuthCookie(res, db.createUser({
                username: username,
                email: email,
                password: password
            }));
            res.send(true);
            
        } else {
            res.status(409).send({error: "Please send a username, password, and email"})
        };
    }
});

// securePages verifies user is logged in before they hit any further endpoints
const securePages = express.Router()
appRouter.use('/secure', securePages)

securePages.delete('/logout', async (_req, res)=> {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

securePages.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await db.getUserByAuthToken(authToken);
    if (user) {
        res.locals.user = user;
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
})

securePages.get('/currentUser', async (req, res) => {
    res.send(await db.getUserByAuthToken(req.cookies[authCookieName]));
})

// Fetch all images
securePages.get("/pictures", async (req, res) => {
    let response = await db.getImages({});
    res.send(response);
})

securePages.get("/pictures/:username", (req, res) => {
    const username = req.params.username;
    let response = [];
    for (let user in users) {
        let userIndex = parseInt(user);
        let currentUser = users[userIndex];
        if (currentUser.username == username) {
            response = currentUser.savedImages;
            break;
        }
    }
    res.send(response);
})

securePages.post('/addImage/:username', (req, res) => {
    const user = res.locals.user;
    const username = req.params.username;
    const name = req.body.name;
    const picture = req.body.picture;
    if (name && picture && username) {
        let images = user.savedImages;
        images.push({
            name: name,
            picture: picture,
        });
        db.addUserImage(images, username);
        res.status(200).send();
    } else {
        res.status(500).send({error: "Please send a username, name and picture"})
    };
});


// Websocket
const websocketPort = '4000'
const httpService = app.listen(websocketPort, () => {
    console.log(`Websocket on port ${websocketPort}`)
});

webSocketInit(httpService);


// Helper Functions
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }


// In the future when I build admin functions
// app.get('/initpictures', async (req, res) => {
//     db.initializePictures();
// })