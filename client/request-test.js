const http = require('http')

const options1 = { host: '127.0.0.1', port: 8081, path: '/micro1' }
const options2 = { host: '127.0.0.1', port: 8082, path: '/micro2' }

for (var i=0; i < 10; i++) {
	http.request(options1, (res) => {
	    res.on('data', (chunk) => console.log(chunk.toString()))
	}).end()	
}

for (var i=0; i < 10; i++) {
	http.request(options2, (res) => {
	    res.on('data', (chunk) => console.log(chunk.toString()))
	}).end()	
}