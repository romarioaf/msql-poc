module.exports = (client, req, resp) => {
	const register = req.get('MSQL-REGISTER')
    const unregister = req.get('MSQL-UNREGISTER')
 
    if (unregister == "ERROR-COUNTER") {
		console.log(unregister);
		
		client.del(`${req.headers.host}:${req.path}:${unregister}`, function(err, data) {
			console.log(`${req.headers.host}:${req.path}:${unregister}`);
		    console.log(data);
		});
	} else {

	    client.get(`${req.headers.host}:${req.path}:ERROR-COUNTER`, function(err, data) {
		  //console.log(`Verificando se serviço ${req.headers.host}${req.path} já foi registrado`);
		  
			if (!data) {


			  	if(register) {
					console.log(`set(${req.headers.host}:${req.path}:COUNT)`);
			    	
			    	client.set(`${req.headers.host}:${req.path}:${register}`, 0, function(err, data) {
					  console.log("Comando ERROR-COUNTER registrado");
					});
			    }
			}

		});

	}
}
