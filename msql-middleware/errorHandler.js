const redis = require("redis")
const client = redis.createClient('6379', '127.0.0.1')

module.exports = (err, req, resp, next) => {

	const register = req.get('MSQL-REGISTER')
 
	if (err) {

	    client.get(`${req.headers.host}:${req.path}:ERROR-COUNTER`, function(err, data) {
		  //console.log(`Verificando se serviço ${req.headers.host}${req.path} já foi registrado`);
		  
		  if (data) {
		  	client.incr(`${req.headers.host}:${req.path}:ERROR-COUNTER`, function(err, data) {
			  console.log("Incrementado erro");
			});
		  }

		});
	} else {

		if(register == "ERROR-COUNTER") {
	    	client.set(`${req.headers.host}:${req.path}:${register}`, 0, function(err, data) {
			  console.log("Registrado");
			});
	    }
	}

	next(err);
}
