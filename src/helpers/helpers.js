'use strict';
const fs = require('fs');
const prettier=require('prettier');


function countriesLanguageHelper(countriesData, language) {
    // this helper will splet the languages for all of the countries because languages attribute is on value
    // and will filter the data based on the language provided
    let filteredResult=[];
    countriesData.forEach((country) => {

        let countryLanguagesList = country.languages.split(",");

        if (countryLanguagesList.includes(language)) {

            filteredResult.push(country.dataValues);
        }
    });

    return filteredResult;
}


function writeFileHelper(data ){

let content = prettier.format( JSON.stringify(data) , { semi: false, parser: "json" } ); 
fs.writeFile('countries.json', content, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('file written successfully ')
  //file written successfully
})

return;
}

module.exports={
    countriesLanguageHelper,
    writeFileHelper
}