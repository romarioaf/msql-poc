const express = require('express')
const server = express()
const msql = require('../msql-middleware/msql')

server.use(msql)

server.get('/micro2', (req, resp) => {
    resp.send('micro 2')
})

server.listen(8082)