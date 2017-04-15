module.exports = (client, req, resp) => {
	
	const register = req.get('MSQL-REGISTER')
    const unregister = req.get('MSQL-UNREGISTER')

    if (unregister == "COUNT") {
		client.del(`${req.headers.host}:${req.path}:${unregister}`, function(err, data) {
			console.log(`${req.headers.host}:${req.path}:${unregister}`);
		    console.log(data);
		});
	} else {

		//VERIFICANDO SE SERVIÇO CONTÉM COMANDO COUNT
	    client.get(`${req.headers.host}:${req.path}:COUNT`, function(err, data) {
		  //console.log(`Verificando se serviço ${req.headers.host}${req.path} foi registrado`);
		  if (data) {
		  	/*console.log("-------------------------------------");
		  	console.log("Serviço já está sendo monitorado");
		  	console.log("-------------------------------------");*/
		  	
		  	console.log(`incr(${req.headers.host}:${req.path}:COUNT)`);

		  	client.incr(`${req.headers.host}:${req.path}:COUNT`, function(err, data) {
			  console.log("Incrementado...");
			});

		  } else {

		  	//REGISTRAR SERVIÇO PARA SER MONITORADOS
		  	if(register == "COUNT") {

		  		console.log(`set(${req.headers.host}:${req.path}:COUNT)`);

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