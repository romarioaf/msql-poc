angular.module('msqlpoc').controller('EstatisticaController', function ($scope, $http) {

 	var micro = {ip_servidor:"127.0.0.1",
 		path:"/micro1",
 		porta:"8081"};

 	var url = "http://127.0.0.1:8085/api/microservice/memoryusage";
	$http({method: 'GET', url: url, params: {host: micro.ip_servidor, port: micro.porta, path: micro.path}})
	.success(function (dados) {
		console.log(dados);
		$scope.labels = ["rss", "heapTotal", "heapUsed", "external"];
		$scope.data = [dados.rss, dados.heapTotal, dados.heapUsed, 76454];
	})
	.error(function (error) {
		console.error(error);
	});;
	
});