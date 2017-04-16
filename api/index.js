const express = require('express')
const app = express()
const redis = require("redis")
const client = redis.createClient('6379', '127.0.0.1')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api/msqlinfo/count', (req, resp) => {

    client.get(`${req.query.host}:${req.query.port}:${req.query.path}:COUNT`, function(err, data) {
      console.log(`${req.query.host}:${req.query.port}:${req.query.path}:COUNT`);
      console.log(data);
      resp.send(data)
    });
})

app.get('/api/msqlinfo/errorcount', (req, resp) => {
   
    client.get(`${req.query.host}:${req.query.port}:${req.query.path}:ERROR-COUNTER`, function(err, data) {
      console.log(`${req.query.host}${req.query.port}:${req.query.path}:ERROR-COUNTER`);
      console.log(data);
      resp.send(data)
    });
})

app.get('/api/msqlinfo/memoryusage', (req, resp) => {
   
    client.get(`${req.query.host}:${req.query.port}:${req.query.path}:MEMORY-USAGE`, function(err, data) {
      console.log(`${req.query.host}${req.query.port}:${req.query.path}:MEMORY-USAGE`);

      if(data) {
        console.log(JSON.parse(data));
        resp.send(JSON.parse(data))
      }
    });
})



app.listen(8085)