const express = require('express')
const server = express()
const msql = require('../msql-middleware/msql')
const errorHandler = require('../msql-middleware/errorHandler')

server.use(msql)

server.get('/micro2', (req, resp) => {
    resp.send('micro 2')
    //throw new Error('something bad happened');
})

server.use(errorHandler)

server.listen(8082)