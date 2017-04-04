const express = require('express')
const server = express()
const msql = require('../msql-middleware/msql')

server.use(msql)

server.get('/micro1', (req, resp) => {
    resp.send('micro 1')
})

server.listen(8081)