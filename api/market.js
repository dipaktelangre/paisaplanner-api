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

// get popular stocks
router.get('/popular-stocks', cors(), bodyParser.json(), (req, res) => {
    // fetch data from a financial API https://api.stockedge.com/Api/PopularStocksDashboardApi/GetPopularStocks?lang=en
    const apiUrl = "https://api.stockedge.com/Api/PopularStocksDashboardApi/GetPopularStocks?lang=en";

    axios.get(apiUrl)
        .then(response => {
            console.log("API response", response.data);
            const popularStocks = response.data.map((item) => ({                        
                companyName: item.Name,
                currentPrice: item.LTP,                        
                changePercent: item.CZG
            }));
            res.json(popularStocks);
        })
        .catch(error => {
            console.error('Error fetching popular stocks data:', error);
            res.status(500).json({ error: 'Failed to fetch popular stocks data' });
        });
});


// get bank nifty
router.get('/bank-nifty', cors(), bodyParser.json(), (req, res) => {
    // fetch data from a financial API https://api.stockedge.com/api/LatestListingPriceDashboardApi/GetLatestListingPrice/17483?lang=en
    const apiUrl = "https://api.stockedge.com/api/LatestListingPriceDashboardApi/GetLatestListingPrice/17483?lang=en";
    axios.get(apiUrl)
        .then(response => {
            console.log("API response", response.data);
            const bankNiftyData = {
                index: 'Bank Nifty',
                currentPrice: response.data.C,
                change: response.data.CZ,
                changePercent: response.data.CZG
            };
            res.json(bankNiftyData);
        })
        .catch(error => {
            console.error('Error fetching Bank Nifty data:', error);
            res.status(500).json({ error: 'Failed to fetch Bank Nifty data' });
        });
});

// get nifty 500 

router.get('/nifty-500', cors(), bodyParser.json(), (req, res) => {
    // fetch data from a financial API https://api.stockedge.com/api/LatestListingPriceDashboardApi/GetLatestListingPrice/17496?lang=en
    const apiUrl = "https://api.stockedge.com/api/LatestListingPriceDashboardApi/GetLatestListingPrice/17496?lang=en";
    axios.get(apiUrl)
        .then(response => {
            console.log("API response", response.data);
            const nifty500Data = {
                index: 'Nifty 500',
                currentPrice: response.data.C,
                change: response.data.CZ,
                changePercent: response.data.CZG
            };
            res.json(nifty500Data);
        })
        .catch(error => {
            console.error('Error fetching Nifty 500 data:', error);
            res.status(500).json({ error: 'Failed to fetch Nifty 500 data' });
        });
});


module.exports = router;