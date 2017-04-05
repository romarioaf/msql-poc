const http = require('http')

const registerHeader = { headers: { 'MSQL-REGISTER': 'COUNT' } }
const options1 = { host: 'localhost', port: 8081, path: '/micro1' }
const options2 = { host: 'localhost', port: 8082, path: '/micro2' }

const registerOptions1 = Object.assign({}, options1, registerHeader)
http.request(registerOptions1, (res) => console.log('register ok')).end()

const registerOptions2 = Object.assign({}, options2, registerHeader) 
http.request(registerOptions2, (res) => console.log('register ok')).end()


http.request(options1, (res) => {
    res.on('data', (chunk) => console.log(chunk.toString()))
}).end()

http.request(options2, (res) => {
    res.on('data', (chunk) => console.log(chunk.toString()))
}).end()