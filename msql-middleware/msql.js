const client = require("./redisClient.js")();
const requestCount = require("./counter.js");
const registerErrorHandler = require("./registerErrorHandler.js");

module.exports = (req, resp, next) => {

	var initialTimer = new Date();
	var totalTimer = null;

	client.on('connect', function() {
	    console.log('connected');
	});

	client.on("error", function (err) {
	    console.log("Error " + err);
	});

	registerErrorHandler(client, req, resp)
	requestCount(client, req, resp)

    next()
}
