const express = require('express');
const app = express();

const marketRoute = require('./market');

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});


app.use('/market', marketRoute);
module.exports = app;