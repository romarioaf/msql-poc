const client = require("./redisClient.js")();
const requestCount = require("./counter.js");
const registerErrorHandler = require("./registerErrorHandler.js");
const memoryUsage = require("./memoryUsage.js");

module.exports = (req, resp, next) => {

	client.on('connect', function() {
	    console.log('connected');
	});

	client.on("error", function (err) {
	    console.log("Error " + err);
	});

	if (req.method != "OPTIONS") {
		registerErrorHandler(client, req, resp)
		requestCount(client, req, resp)
		memoryUsage(client, req, resp);
	}

    next()
}
