// import {login, getUserData} from 'authService.js';

const express = require('express');
const app = express();

app.listen(3000);

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use(express.static('public'));

app.get('/login', (req, res) => {
    // let username, password = login(req.params.username, req.params.password);
    if (true) {
        res.send(true)
    } else {
        res.send(false)
    };
})