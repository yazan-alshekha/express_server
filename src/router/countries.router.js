'use strict';

const express = require('express');
const router = express.Router();

const {getAllCountriesHandler ,saveCountriesToDB} = require('../controllers/controllers');

// save the Countries To database route (only one time)
router.get('/sead',saveCountriesToDB);


router.get('/countries', getAllCountriesHandler);

// router.get('/');

module.exports = router ;
