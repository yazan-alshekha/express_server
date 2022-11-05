'use strict';

const countries=(sequelize , datatype) => sequelize.define('countries',{
    name:{
        type:datatype.STRING,
    },
    languages:{
        type:datatype.STRING,
    },
    cca2:{
        type:datatype.STRING,
    },
    cca3:{
        type:datatype.STRING,
    },
    ccn3:{
        type:datatype.DECIMAL,
    },
    currencies:{
        type:datatype.STRING,
    },
    region:{
        type:datatype.STRING,
    },
    latitude:{
        type:datatype.STRING,
    },
    longitude:{
        type:datatype.STRING,
    },
})


module.exports = countries;