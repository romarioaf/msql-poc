const express = require('express')
const server = express()
const redis = require("redis")
const client = redis.createClient('6379', '127.0.0.1')

server.get('/api/msqlinfo/count', (req, resp) => {

    client.get(`${req.query.host}:${req.query.port}:${req.query.path}:COUNTER`, function(err, data) {
      console.log(`${req.query.host}${req.query.port}:${req.query.path}:COUNTER`);
      console.log(data);
      resp.send(data)
    });
})

server.get('/api/msqlinfo/errorcount', (req, resp) => {
   
    client.get(`${req.query.host}:${req.query.port}:${req.query.path}:ERROR-COUNTER`, function(err, data) {
      console.log(`${req.query.host}${req.query.port}:${req.query.path}:ERROR-COUNTER`);
      console.log(data);
      resp.send(data)
    });
})

server.listen(8085)