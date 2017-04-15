const http = require('http')

const registerHeaderCounter = { headers: { 'MSQL-REGISTER': 'COUNT' } }

const registerHeaderErrorCounter = { headers: { 'MSQL-REGISTER': 'ERROR-COUNTER' } }

const options1 = { host: 'localhost', port: 8081, path: '/micro1' }
const options2 = { host: 'localhost', port: 8082, path: '/micro2' }

const registerOptions1 = Object.assign({}, options1, registerHeaderCounter)
http.request(registerOptions1, (res) => console.log('register ok')).end()

const registerOption2 = Object.assign({}, options1, registerHeaderErrorCounter)
http.request(registerOptions1, (res) => console.log('register ok')).end()


const registerOptions3 = Object.assign({}, options2, registerHeaderCounter) 
http.request(registerOptions3, (res) => console.log('register ok')).end()

const registerOptions4 = Object.assign({}, options2, registerHeaderErrorCounter) 
http.request(registerOptions4, (res) => console.log('register ok')).end()


/*http.request(options1, (res) => {
    res.on('data', (chunk) => console.log(chunk.toString()))
}).end()

http.request(options2, (res) => {
    res.on('data', (chunk) => console.log(chunk.toString()))
}).end()*/