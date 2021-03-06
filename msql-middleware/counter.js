module.exports = (client, req, resp) => {
	
	const register = req.get('MSQL-REGISTER')
    const unregister = req.get('MSQL-UNREGISTER')

    console.log("requisicao:", req.method);
    console.log('MSQL-REGISTER', register);
    console.log('MSQL-UNREGISTER', unregister);

    if (unregister == "COUNT") {
		client.del(`${req.headers.host}:${req.path}:${unregister}`, function(err, data) {
			console.log(`DELETANDO: ${req.headers.host}:${req.path}:${unregister}`);
		    console.log(data);
		});
	} else {

		//VERIFICANDO SE SERVIÇO CONTÉM COMANDO COUNT
	    client.get(`${req.headers.host}:${req.path}:COUNT`, function(err, data) {
		  
		  if (data) {
		  	
		  	console.log(`incr(${req.headers.host}:${req.path}:COUNT)`);

		  	client.incr(`${req.headers.host}:${req.path}:COUNT`, function(err, data) {
			  console.log("INCREMENTADO...");
			});

		  } else {

		  	//REGISTRAR SERVIÇO PARA SER MONITORADO
		  	if(register == "COUNT") {

		  		console.log(`set(${req.headers.host}:${req.path}:COUNT)`);

		    	client.set(`${req.headers.host}:${req.path}:${register}`, 0, function(err, data) {
				  console.log("-------------------------------------");
				  console.log("Registrado" + new Date().getTime());
				  console.log("-------------------------------------");
				});
		    }
		  }

		});

	}

}