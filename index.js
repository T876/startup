// Third Party Modules
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db  = require('./database.js');
const { WebSocketServer } = require( 'ws' )

const authCookieName = 'authCookie';
const app = express();

// Using the following middleware:
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.listen(4000);

// Authentication endpoints - Login and account creation
app.get('/login/:username/:password', async (req, res) => {
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



app.post('/create', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (await db.getUserByEmail(email)) {
        res.status(409).send({error: "Existing user. Please use another email."})
    } else if (await db.getUserByUsername(username)) {
        res.status(409).send({error: "Existing user. Please use another username."})
    } else {
        if (username && password && email) {
            res.send(await db.createUser({
                username: username,
                email: email,
                password: password
            }));
        } else {
            res.status(409).send({error: "Please send a username, password, and email"})
        };
    }
});

// securePages verifies user is logged in before they hit any further endpoints
let securePages = express.Router()
app.use('/secure', securePages)

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

const wss = new WebSocketServer({port: 9000});

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        const msg = String.fromCharCode(...data);
        console.log("received: %s", msg)

        ws.send(`I heard you say: ${msg}`)
        
       
    });
    ws.send('Connection Active')
})




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