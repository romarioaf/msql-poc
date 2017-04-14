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

    const register = req.get('MSQL-REGISTER')
    const unregister = req.get('MSQL-UNREGISTER')
    
    console.log(`${req.headers.host}:${req.path}:COUNT`);

    if (unregister) {
		console.log("UNREGISTER");
		console.log(unregister);
		
		client.del(`${req.headers.host}:${req.path}:${unregister}`, function(err, data) {
			console.log(`${req.headers.host}:${req.path}:${unregister}`);
		    console.log(data);
		});
	} else {

		//VERIFICANDO SE SERVIÇO CONTÉM COMANDO COUNT
	    client.get(`${req.headers.host}:${req.path}:COUNT`, function(err, data) {
		  console.log("Verificando se serviço foi registrado");
		  if (data) {
		  	console.log("Serviço já está sendo monitorado");
		  	
		  	client.incr(`${req.headers.host}:${req.path}:COUNT`, function(err, data) {
			  console.log("Incrementado...");
			});

		  } else {
		  	console.log("Serviço ainda não está sendo monitorado");

		  	//REGISTRAR SERVIÇOS PARA SEREM MONITORADOS
		  	if(register) {
		    	console.log("REGISTER");

		    	client.set(`${req.headers.host}:${req.path}:${register}`, 0, function(err, data) {
				  console.log("Registrado");
				});
		    }
		  }

		});

	}
    
    next()
}
