const redis = require("redis")
const client = redis.createClient('6379', '127.0.0.1')

module.exports = (err, req, resp, next) => {

	if (err) {

		const register = req.get('MSQL-REGISTER')
	    const unregister = req.get('MSQL-UNREGISTER')

	    if (unregister) {
			console.log("UNREGISTER");
			console.log(unregister);
			
			client.del(`${req.headers.host}:${req.path}:${unregister}`, function(err, data) {
				console.log(`${req.headers.host}:${req.path}:${unregister}`);
			    console.log(data);
			});
		} else {

			console.log(`${req.headers.host}:${req.path}:ERROR-COUNTER`);

		    client.get(`${req.headers.host}:${req.path}:ERROR-COUNTER`, function(err, data) {
			  console.log(`Verificando se serviço ${req.headers.host}${req.path} foi registrado`);
			  if (data) {

			  	client.incr(`${req.headers.host}:${req.path}:ERROR-COUNTER`, function(err, data) {
				  console.log("Incrementado erro");
				});

			  } else {

			  	if(register) {
			    	client.set(`${req.headers.host}:${req.path}:${register}`, 0, function(err, data) {
					  console.log("Registrado");
					});
			    }
			  }

			});

		}
	}

	next(err);
}