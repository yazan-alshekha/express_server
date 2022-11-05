'use strict';



const axios = require('axios');

const {countries} = require('../models/index');
const { route } = require('../router/countries.router');


async function saveCountriesToDB(req,res){
    
    // let thirdPartyApiData = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

    let thirdPartyApiData = await axios.get('https://restcountries.com/v3.1/all');
    // let countryName = thirdPartyApiData.data[227].name.official;
    // let languages =  thirdPartyApiData.data[227].languages ? true : "empty"  ;  // this is an array
    // let cca2 = thirdPartyApiData.data[227].cca2;
    // let cca3 = thirdPartyApiData.data[227].cca3;
    // let ccn3 = thirdPartyApiData.data[227].ccn3;
    // let currencies = thirdPartyApiData.data[227].currencies ? true :"empty" ;
    
    // let region = thirdPartyApiData.data[227].region
  
    // let lat = thirdPartyApiData.data[227].latlng[0]
    // let lng = thirdPartyApiData.data[227].latlng[1]
    // let obj = {
    //             countryName,
    //             languages ,
    //             cca2,
    //             cca3,
    //             ccn3,
    //             currencies,
    //             region,
    //             lat,
    //             lng
    //         }
    // console.log(obj);
    // console.log(   countryName ,languages , cca2  , cca3 , ccn3 , currencies , region ,lat , lng);
    let id =0;
    

    thirdPartyApiData.data.forEach( country => {
        
        let name = country.name.official;
        let languages =  country.languages ? country.languages : "empty"
        let cca2 = country.cca2;
        let cca3 = country.cca3;
        let ccn3 = country.ccn3;
        let currencies = country.currencies ? country.currencies :"empty" ;
        let region = country.region;
        let latitude = country.latlng[0];
        let longitude = country.latlng[1];

        /////////////////////////////////////////////////////////////////////////////////////////////  
        // object number 227 doesn't have (currencies , languages) properties
        // so i come up with a quick solution 
        let languages2=[];
        for (const key of Object.keys(languages)) {
            if (languages !="empty"){
                const val = languages[key];

                languages2.push(val);
            }
            else{ languages2 = "empty"; }
        }

        if (languages2 != "empty"){
            languages2 = languages2.join();
        }

        let currencies2 ; 
        if (currencies != "empty") {
            currencies2=currencies[Object.keys(currencies)[0]].name;
        }else{ currencies2 = "empty" ; }

///////////////////////////////////////////////
        let obj = {
            id,
            name,
            languages :languages2 ,
            cca2,
            cca3,
            ccn3,
            currencies:currencies2 ,
            region,
            latitude,
            longitude
        }
        id +=1;

        // save the objects to database one by one 
        countries.createRecord(obj);

    });
    
    res.send("seed successfully ");

}

async function getAllCountriesHandler(req,res){
   let result = await countries.readAll();
    res.json(result);
}



module.exports={
    getAllCountriesHandler ,
    saveCountriesToDB,
}