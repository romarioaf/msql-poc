const redis = require("redis")
const client = redis.createClient('6379', '127.0.0.1')

module.exports = (req, resp, next) => {

	client.on('connect', function() {
	    console.log('connected');
	});

	client.on("error", function (err) {
	    console.log("Error " + err);
	});

    const register = req.get('MSQL-REGISTER')
    const unregister = req.get('MSQL-UNREGISTER')
    
    if(register) {
    	console.log("REGISTER");

    	client.incr(`${req.headers.host}:${req.path}:${register}`, function(err, data) {
		  console.log("Incrementado...");
		});
    } else if (unregister) {
    	console.log("UNREGISTER");
    	console.log(unregister);
    	
    	client.del(`${req.headers.host}:${req.path}:${unregister}`, function(err, data) {
    		console.log(`${req.headers.host}:${req.path}:${unregister}`);
		    console.log(data);
		});
    }
    
    next()
}