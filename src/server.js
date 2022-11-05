'use strict';

const express = require('express');
const cors = require('cors');
const countriesRouter= require('./router/countries.router');


const app= express();
app.use(express.json());// access the body
app.use(cors());

app.use(countriesRouter);



function start(port){
    app.listen(port , () =>{ console.log(`server is listen on the port : ${port}`) })
}


app.get('/',(req,res)=>{ res.send(' server')} )
app.get('/hi',(req,res)=>{ res.send('hi from server')} )



module.exports ={
    start:start
}; 
