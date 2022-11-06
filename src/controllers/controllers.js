'use strict';

const axios = require('axios');

const { countries } = require('../models/index');

const { countriesLanguageHelper, writeFileHelper } = require('../helpers/helpers')





async function saveCountriesToDB(req, res) {

    let thirdPartyApiData = await axios.get('https://restcountries.com/v3.1/all');

    let id = 0;

    thirdPartyApiData.data.forEach(country => {

        let name = country.name.official;
        let languages = country.languages ? country.languages : "empty"
        let cca2 = country.cca2;
        let cca3 = country.cca3;
        let ccn3 = country.ccn3;
        let currencies = country.currencies ? country.currencies : "empty";
        let region = country.region;
        let latitude = country.latlng[0];
        let longitude = country.latlng[1];

        /////////////////////////////////////////////////////////////////////////////////////////////  
        // object number 227 doesn't have (currencies , languages) properties
        // so i come up with a quick solution 
        let languages2 = [];
        for (const key of Object.keys(languages)) {
            if (languages != "empty") {
                const val = languages[key].toLowerCase();;

                languages2.push(val);
            }
            else { languages2 = "empty"; }
        }

        if (languages2 != "empty") {
            languages2 = languages2.join();
        }

        let currencies2;
        if (currencies != "empty") {
            currencies2 = currencies[Object.keys(currencies)[0]].name;
        } else { currencies2 = "empty"; }

        ///////////////////////////////////////////////
        let obj = {
            id,
            name,
            languages: languages2,
            cca2,
            cca3,
            ccn3,
            currencies: currencies2,
            region,
            latitude,
            longitude
        }
        id += 1;

        // save the objects to database one by one 
        countries.createRecord(obj);
    });

    res.send("seed successfully ");

}

async function getAllCountriesHandler(req, res) {
    let { cca2, cca3, ccn3, name } = req.query;
    let result;
    if (cca2) {
        result = await countries.readRecord('cca2', cca2);
    }
    else if (cca3) {
        result = await countries.readRecord('cca3', cca3);

    }
    else if (ccn3) {
        result = await countries.readRecord('ccn3', ccn3);
    }
    else if (name) {
        result = await countries.readRecord('name', name);
    }
    else {
        result = await countries.readRecord();
    }
    res.json(result);
}

async function countryCurrenciesHandler(req, res) {
    let { cca2 } = req.query;
    if (cca2) {
        let result = await countries.getCurrenciesByCca2(cca2)
        res.json(result);
    }
    else {
        res.send('you need to provide a cca2 as a query parameters');

    }

}

async function groupCountriesHandler(req, res) {
    let { region, language } = req.query;
    let result;
    if (region) {
        result = await countries.groupCountries('region', region);
    }
    else if (language) {
        result = await countries.readRecord();
        result = countriesLanguageHelper(result, language);
    }
    else {
        result = 'you should provide a language or a region'
    }
    res.json(result);
}

async function writeFileHandler(req, res) {
    let thirdPartyApiData = await axios.get('https://restcountries.com/v3.1/all');
    
    //   to write into the countries.json file 
    writeFileHelper(thirdPartyApiData.data );
    
  
    // to read from countries.json file and send it to the user
    const fs = require('fs');
    const filePath = `${__dirname}/../../countries.json`;

    fs.readFile(filePath, (err, file) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Could not download file');
        }

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment ; filename="countries.json"');

        res.send(file);
    });

}


module.exports = {
    getAllCountriesHandler,
    saveCountriesToDB,
    countryCurrenciesHandler,
    groupCountriesHandler,
    writeFileHandler
}