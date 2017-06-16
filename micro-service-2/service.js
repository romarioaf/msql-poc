const express = require('express')
const server = express()
const msql = require('../msql-middleware/msql')
const errorHandler = require('../msql-middleware/errorHandler')

server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, MSQL-REGISTER');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

server.use(msql)

server.get('/micro2', (req, resp) => {
    resp.send('micro 2')
    //throw new Error('something bad happened');
})

server.use(errorHandler)

server.listen(8082)