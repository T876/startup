// Third Party Modules
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db  = require('./database.js');
const { UUID } = require('mongodb');

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

app.get('/logout', async (req, res)=> {
    res.clearCookie(authCookieName);
    res.status(204);
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

securePages.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await db.getUserByAuthToken(authToken);
    if (user) {
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

// TODO: Fetch all images for user from DB
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

// TODO: Add this to the user's user record
securePages.post('/addImage/:username', (req, res) => {
    const username = req.params.username;
    const name = req.body.name;
    const picture = req.body.picture;
    if (name && picture && username) {
        res.send(addPicture(username, name, picture));
    } else {
        res.status(500).send({error: "Please send a username, name and picture"})
    };
});





function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }


function addPicture(username, name, picture) {
    for (i in users) {
        let userIndex = parseInt(i);
        let user = users[userIndex];
        if (user.username == username) {
            user.savedImages.push({
                name: name,
                picture, picture
            })
            return true;
        }
    }
    return false;
}

// In the future when I build admin functions
// app.get('/initpictures', async (req, res) => {
//     db.initializePictures();
// })