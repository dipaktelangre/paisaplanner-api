const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.json({ status: 'OK', message: 'API is running smoothly.' });
});


router.get('/sensex', cors(), bodyParser.json(), (req, res) => {
    // fetch data from a financial API https://api.stockedge.com/api/LatestListingPriceDashboardApi/GetLatestListingPrice/68419?lang=en
    // return the data as JSON

    const apiUrl = 'https://api.stockedge.com/api/LatestListingPriceDashboardApi/GetLatestListingPrice/68419?lang=en';
    axios.get(apiUrl)
        .then(response => {            
            console.log("API response", response.data);
            const sensexData = {
                index: 'Sensex',
                currentPrice: response.data.C,
                change: response.data.CZ,
                changePercent: response.data.CZG
            };
            res.json(sensexData);
        })
        .catch(error => {
            console.error('Error fetching Sensex data:', error);
            res.status(500).json({ error: 'Failed to fetch Sensex data' });
        });
});

router.get('/nifty', cors(), bodyParser.json(), (req, res) => {
    // fetch data from a financial API https://api.stockedge.com/api/LatestListingPriceDashboardApi/GetLatestListingPrice/68420?lang=en
    const apiUrl = "https://api.stockedge.com/api/LatestListingPriceDashboardApi/GetLatestListingPrice/17490?lang=en";
    axios.get(apiUrl)
        .then(response => {
            console.log("API response", response.data);
            const niftyData = {
                index: 'Nifty',
                currentPrice: response.data.C,
                change: response.data.CZ,
                changePercent: response.data.CZG
            };
            res.json(niftyData);
        })
        .catch(error => {
            console.error('Error fetching Nifty data:', error);
            res.status(500).json({ error: 'Failed to fetch Nifty data' });
        });
});


module.exports = router;