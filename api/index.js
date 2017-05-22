const app = require("./config/customExpress")();

app.listen('8085', function () {
	console.log('API em execução. Porta: 8085');
});