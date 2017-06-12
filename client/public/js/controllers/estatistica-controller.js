angular.module('msqlpoc').controller('EstatisticaController', function ($scope, $http, CompartilharDadosService) {

 	var micro = CompartilharDadosService.getMicro();
 	$scope.contadorRequisicao = 0;
 	$scope.contadorErros = 0;

	$http({method: 'GET', url: "http://127.0.0.1:8085/api/microservice/memoryusage", params: {host: micro.ip_servidor, port: micro.porta, path: micro.path}})
	.success(function (dados) {
		$scope.labels = ["rss", "heapTotal", "heapUsed"];//"external"
		$scope.data = [dados.rss, dados.heapTotal, dados.heapUsed];
	})
	.error(function (error) {
		console.error(error);
	});;

	$http({method: 'GET', url: "http://127.0.0.1:8085/api/microservice/count", params: {host: micro.ip_servidor, port: micro.porta, path: micro.path}})
	.success(function (dado) {
		$scope.contadorRequisicao = dado;
	})
	.error(function (error) {
		console.error(error);
	});;

	$http({method: 'GET', url: "http://127.0.0.1:8085/api/microservice/errorcount", params: {host: micro.ip_servidor, port: micro.porta, path: micro.path}})
	.success(function (dado) {
		$scope.contadorErros = dado;
	})
	.error(function (error) {
		console.error(error);
	});;
	
});