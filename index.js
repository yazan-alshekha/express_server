'use strict';

const server = require('./src/server')
require('dotenv').config();

const {db} = require('./src/models/index')
const portNumber=process.env.PORT;

db.sync().then(()=>{

    server.start(portNumber || 3001);
})