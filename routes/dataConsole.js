const express = require('express');
const { scraper } = require('../controllers/scraper.js');

const router = express.Router();

router.post('/scrape', scraper);

module.exports = { router };
