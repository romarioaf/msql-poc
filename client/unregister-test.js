const http = require('http')

const unregisterHeaderCounter = { headers: { 'MSQL-unregister': 'COUNT' } }

const unregisterHeaderErrorCounter = { headers: { 'MSQL-unregister': 'ERROR-COUNTER' } }

const options1 = { host: 'localhost', port: 8081, path: '/micro1' }
const options2 = { host: 'localhost', port: 8082, path: '/micro2' }

const unregisterOptions1 = Object.assign({}, options1, unregisterHeaderCounter)
http.request(unregisterOptions1, (res) => console.log('unregister ok')).end()

const unregisterOption2 = Object.assign({}, options1, unregisterHeaderErrorCounter)
http.request(unregisterOptions1, (res) => console.log('unregister ok')).end()



const unregisterOptions3 = Object.assign({}, options2, unregisterHeaderCounter) 
http.request(unregisterOptions3, (res) => console.log('unregister ok')).end()

const unregisterOptions4 = Object.assign({}, options2, unregisterHeaderErrorCounter) 
http.request(unregisterOptions4, (res) => console.log('unregister ok')).end()


/*http.request(options1, (res) => {
    res.on('data', (chunk) => console.log(chunk.toString()))
}).end()

http.request(options2, (res) => {
    res.on('data', (chunk) => console.log(chunk.toString()))
}).end()*/