const express = require('express');
const app = express();

app.listen(3000);

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use(express.static('public'));4