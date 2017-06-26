angular.module('msqlpoc').controller('EstatisticaController', 
	function ($scope, $http, CompartilharDadosService, apiMicroservice) {

 	var micro = CompartilharDadosService.getMicro();

	$scope.contadorRequisicao = 0;
	$scope.contadorErros = 0;

	$http({method: 'GET', url: apiMicroservice+"/memoryusage", params: {host: micro.ip_servidor, port: micro.porta, path: micro.path}})
	.success(function (dados) {
		$scope.labels = ["rss", "heapTotal", "heapUsed"];//"external"
		$scope.data = [dados.rss, dados.heapTotal, dados.heapUsed];
	})
	.error(function (error) {
		console.error(error);
	});

	$http({method: 'GET', url: apiMicroservice+"/count", params: {host: micro.ip_servidor, port: micro.porta, path: micro.path}})
	.success(function (dado) {
		if (dado)
			$scope.contadorRequisicao = dado;
	})
	.error(function (error) {
		console.error(error);
	});

	$http({method: 'GET', url: apiMicroservice+"/errorcount", params: {host: micro.ip_servidor, port: micro.porta, path: micro.path}})
	.success(function (dado) {
		if (dado)
			$scope.contadorErros = dado;
	})
	.error(function (error) {
		console.error(error);
	});

});