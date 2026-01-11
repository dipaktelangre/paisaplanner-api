const express = require('express');
const app = express();

const marketRoute = require('./market');
const currencyRoute = require('./currency');



app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.use('/currency', currencyRoute);
app.use('/market', marketRoute);
module.exports = app;