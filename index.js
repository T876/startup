// import {login, getUserData} from 'authService.js';

const express = require('express');
const app = express();

app.listen(3000);

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get('/login/:username/:password', (req, res) => {
    const username = req.params.username
    const password =  req.params.password
    if (username && password) {
        let response = loginUser(username, password);
        if (response) {
            res.send(response);
        }
        else {
            //TODO: send an error here saying that the username and password are incorrect
        }
    } else {
        // TODO: send an error here saying that we got a bad request
    };
});

app.use(express.static('public'));

// DB placeholder for user profiles, these are stored in memory and will be lost when the service is restarted.
let users = [
    {
        username: "johnDoe",
        password: "abc123",
        savedImages: []
    }, {
        username: "tate",
        password: "123",
        savedImages: []
    },
];

function loginUser(username, password) {

    let userExists = false;
    let returnUser = {};

    for (let user in users) {
        console.log(users[parseInt(user)])
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