"use strict";

// don't forget to install --> npm i pg ,sequelize

const {Sequelize,DataTypes} =require("sequelize"); 
require('dotenv').config();// to read from the .env file 

const countries = require('./countries.model');


const collection = require('./collection');



//prepare the connection
// connect to our DB depending on the URL as an environmental variable
const POSTGRESS_URL = process.env.DATABASE_URL; 



let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};


let sequelize = new Sequelize(POSTGRESS_URL,sequelizeOptions);

let countriesModel = countries( sequelize , DataTypes);


let countiesCollection = new collection(countriesModel);


module.exports = {
    db : sequelize,//for real connection and will use it in index.js
    countries : countiesCollection,// for creating the table and will use it in our routes
}

