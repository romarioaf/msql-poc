const redis = require("redis")
const client = redis.createClient('6379', '127.0.0.1')
const requestCount = require("./counter.js");

module.exports = (req, resp, next) => {

	client.on('connect', function() {
	    console.log('connected');
	});

	client.on("error", function (err) {
	    console.log("Error " + err);
	});

    requestCount(client, req, resp)
    
    next()
}
