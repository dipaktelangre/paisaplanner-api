const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios');
const memoryCache = require('memory-cache');
const CACHE_TTL = 30 * 60 * 1000; // Cache for 30 minutes

router.get('/', (req, res) => {
    res.json({ status: 'OK', message: 'Currency is running smoothly.' });
});

router.get('/exchange-rate', cors(), bodyParser.json(), (req, res) => {
    const base = req.query.base || 'USD';
    const target = req.query.target || 'INR';
    let apiUrl = `https://api.frankfurter.dev/v1/latest?base=${base}&symbols=${target}`;    

    const cachedExchangeRate = memoryCache.get(`exchangeRate_${base}_${target}`);
    if (cachedExchangeRate) {
        console.log('Returning cached exchange rate data');
        return res.json(cachedExchangeRate);
    }

    axios.get(apiUrl)
        .then(response => {
            console.log("API response", response.data);
            const exchangeRate = {
                base: response.data.base,
                target: target,
                rate: response.data.rates[target],
                date: response.data.date
            };
            memoryCache.put(`exchangeRate_${base}_${target}`, exchangeRate, CACHE_TTL);
            res.json(exchangeRate);
        })
        .catch(error => {
            console.error('Error fetching exchange rate data:', error);
            res.status(500).json({ error: 'Failed to fetch exchange rate data' });
        });
});

module.exports = router;