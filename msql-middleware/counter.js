module.exports = (client, req, resp) => {
	
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

		//VERIFICANDO SE SERVIÇO CONTÉM COMANDO COUNT
	    client.get(`${req.headers.host}:${req.path}:COUNT`, function(err, data) {
		  console.log(`Verificando se serviço ${req.headers.host}${req.path} foi registrado`);
		  if (data) {
		  	console.log("-------------------------------------");
		  	console.log("Serviço já está sendo monitorado");
		  	console.log("-------------------------------------");
		  	
		  	client.incr(`${req.headers.host}:${req.path}:COUNT`, function(err, data) {
			  console.log("Incrementado...");
			});

		  } else {
		  	console.log("-------------------------------------");
		  	console.log("Serviço ainda não está sendo monitorado");
		  	console.log("-------------------------------------");

		  	//REGISTRAR SERVIÇOS PARA SEREM MONITORADOS
		  	if(register) {
		    	client.set(`${req.headers.host}:${req.path}:${register}`, 0, function(err, data) {
				  console.log("-------------------------------------");
				  console.log("Registrado");
				  console.log("-------------------------------------");
				});
		    }
		  }

		});

	}

}