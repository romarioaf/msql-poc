const http = require('http')

const unregisterHeaderCounter = { headers: { 'MSQL-UNREGISTER': 'COUNT' } }
const unregisterHeaderErrorCounter = { headers: { 'MSQL-UNREGISTER': 'ERROR-COUNTER' } }
const registerMemoryUsage = { headers: { 'MSQL-UNREGISTER': 'MEMORY-USAGE' } }


const options1 = { host: 'localhost', port: 8081, path: '/micro1' }
const options2 = { host: 'localhost', port: 8082, path: '/micro2' }

const unregisterOptions1 = Object.assign({}, options1, unregisterHeaderCounter)
http.request(unregisterOptions1, (res) => console.log('unregister ok')).end()

const unregisterOptions2 = Object.assign({}, options1, unregisterHeaderErrorCounter)
http.request(unregisterOptions2, (res) => console.log('unregister ok')).end()

const registerOptions3 = Object.assign({}, options1, registerMemoryUsage)
http.request(registerOptions3, (res) => console.log('unregister ok')).end()


const unregisterOptions4 = Object.assign({}, options2, unregisterHeaderCounter) 
http.request(unregisterOptions4, (res) => console.log('unregister ok')).end()

const unregisterOptions5 = Object.assign({}, options2, unregisterHeaderErrorCounter) 
http.request(unregisterOptions5, (res) => console.log('unregister ok')).end()

const registerOptions6 = Object.assign({}, options2, registerMemoryUsage)
http.request(registerOptions6, (res) => console.log('unregister ok')).end()

/*http.request(options1, (res) => {
    res.on('data', (chunk) => console.log(chunk.toString()))
}).end()

http.request(options2, (res) => {
    res.on('data', (chunk) => console.log(chunk.toString()))
}).end()*/