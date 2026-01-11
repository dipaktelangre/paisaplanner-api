const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/browser')));



// adding all API routes to app here
const v1 = require('./api');
app.use('/api/v1', v1);

// Serve Angular app for all other routes
app.get('*angular', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/browser', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

module.exports = app;
