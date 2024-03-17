// import {login, getUserData} from 'authService.js';

const express = require('express');
const app = express();

app.use(express.json())

app.listen(3000);

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

// Authentication endpoints - Login and account creation
app.get('/login/:username/:password', (req, res) => {
    const username = req.params.username
    const password =  req.params.password
    if (username && password) {
        let response = loginUser(username, password);
        if (response) {
            res.send(response);
        }
        else {
            res.send({error: "Incorrect username and password combination"})
        }
    } else {
        res.status(500).send({error: "Please send a username and password"})
    };
});

app.post('/create', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (username && password && email) {
        res.send(createUser(username, password, email));
    } else {
        res.status(500).send({error: "Please send a username, password, and email"})
    };
});

// Fetch all images
app.get("/pictures", (req, res) => {
    res.send(pictures);
})


// Fetch all images for a specific user
app.get("/pictures/:username", (req, res) => {
    const username = req.params.username;
    let response = [];
    for (let user in users) {
        let userIndex = parseInt(user);
        let currentUser = users[userIndex];
        console.log(user);
        if (currentUser.username == username) {
            response = currentUser.savedImages;
            break;
        }
    }
    res.send(response);
})

// Add image to a user's 'My Library' Page
app.post('/addImage/:username', (req, res) => {
    const username = req.params.username;
    const name = req.body.name;
    const picture = req.body.picture;
    if (name && picture && username) {
        res.send(addPicture(username, name, picture));
    } else {
        res.status(500).send({error: "Please send a username, name and picture"})
    };
});

app.use(express.static('public'));

// DB placeholder for user profiles, these are stored in memory and will be lost when the service is restarted.
let users = [
    {
        username: "johnDoe",
        email: "john@doe.com",
        password: "abc123",
        savedImages: [{
                name: "Dragon",
                picture: "../img_placeholder.png"
            }, {
                name: "Wizard",
                picture: "../img_placeholder.png"
            }, {
                name: "Warrior",
                picture: "../img_placeholder.png"
            }, 
        ]
    }, {
        username: "tate",
        email: "taters@me.com",
        password: "123",
        savedImages: [{
                name: "Warlock",
                picture: "../img_placeholder.png"
            }, {
                name: "Sorcerer",
                picture: "../img_placeholder.png"
            }, {
                name: "Goblin",
                picture: "../img_placeholder.png"
            }, 
        ]
    },
];

// Placeholder for pictures from image DB
let pictures = [{
    name: "Dragon",
    picture: "../img_placeholder.png"
}, {
    name: "Wizard",
    picture: "../img_placeholder.png"
}, {
    name: "Warrior",
    picture: "../img_placeholder.png"
}, {
    name: "Warlock",
    picture: "../img_placeholder.png"
}, {
    name: "Sorcerer",
    picture: "../img_placeholder.png"
}, {
    name: "Goblin",
    picture: "../img_placeholder.png"
}, ]

function loginUser(username, password) {

    let userExists = false;
    let returnUser = {};

    for (let user in users) {
        userIndex = parseInt(user)
        if (users[userIndex].username == username && users[userIndex].password == password) {
            userExists = true;
            returnUser = users[userIndex];
        }
    };

    if (!userExists) {
        return false;
    } else {
        return returnUser;
    };
}

function createUser(username, password, email) {
    // Check to see if the user already exists
    let userExists = false;
    for (let user in users) {
        userIndex = parseInt(user)
        if (users[userIndex].username == username && users[userIndex].password == password) {
            userExists = true;
        }
    };

    if (!userExists) {
        users.push(
            {
                username: username,
                password: password,
                email: email,
                savedImages: [ {
                    name: "Dragon",
                    picture: "../img_placeholder.png"
                }, {
                    name: "Wizard",
                    picture: "../img_placeholder.png"
                }, {
                    name: "Warrior",
                    picture: "../img_placeholder.png"
                }, ]
            }
        );
        
    }
    return true;
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