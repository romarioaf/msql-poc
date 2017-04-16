module.exports = (client, req, resp) => {
	
	const register = req.get('MSQL-REGISTER')
    const unregister = req.get('MSQL-UNREGISTER')

    console.log(process.memoryUsage());

    if (unregister == "MEMORY-USAGE") {
    	client.del(`${req.headers.host}:${req.path}:${unregister}`, function(err, data) {
			console.log(`UNREG: ${req.headers.host}:${req.path}:${unregister}`);
		});
    } else {
    	if (register == "MEMORY-USAGE") {
			var memoryInfo = process.memoryUsage();
	    	
	    	client.set(`${req.headers.host}:${req.path}:${register}`, JSON.stringify(memoryInfo), function(err, data) {
			  console.log("Registrando uso de memória.");
			});
	    }
    }

}