const express = require('express')
const server = express()
const redis = require("redis")
const client = redis.createClient('6379', '127.0.0.1')

server.get('/api/msqlinfo/count', (req, resp) => {
    console.log(req.query.host);
    console.log(req.query.port);
    console.log(req.query.path);
    console.log(req.query.command);

    client.get(`${req.query.host}:${req.query.port}:${req.query.path}:${req.query.command}`, function(err, data) {
      console.log(`${req.query.host}${req.query.port}:${req.query.path}:${req.query.command}`);
      console.log(data);
      resp.send(data)
    });
})

server.listen(8085)