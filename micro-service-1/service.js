var express = require('express');
const server = express()
const msql = require('../msql-middleware/msql')

server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, MSQL-REGISTER, MSQL-UNREGISTER');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

server.use(msql)


server.get('/micro1', (req, resp) => {
    resp.send('micro 1')
})

server.listen(8081)