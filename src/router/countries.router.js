'use strict';

const express = require('express');
const router = express.Router();
const validator = require('../middleware/validator');

const {getAllCountriesHandler ,saveCountriesToDB , countryCurrenciesHandler,groupCountriesHandler ,writeFileHandler } = require('../controllers/controllers');

// save the Countries To database route (only one time)
router.get('/seed',saveCountriesToDB);


router.get('/countries', getAllCountriesHandler);

router.get('/country_currencies' , countryCurrenciesHandler);

router.get('/group_countries' , groupCountriesHandler);

router.get('/download_countries_file',validator , writeFileHandler );


module.exports = router ;
