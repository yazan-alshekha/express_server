'use strict';



const axios = require('axios');

function getAllCountriesHandler(req,res){
    res.send('test');
}

async function saveCountriesToDB(req,res){
    
    
}


module.exports={
    getAllCountriesHandler ,
    saveCountriesToDB,
}