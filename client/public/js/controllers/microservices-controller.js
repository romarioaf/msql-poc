angular.module('msqlpoc').controller('MicroservicesController', 
	function ($scope, $http, $routeParams, CompartilharDadosService) {
	
	$scope.microservices = [];
	$scope.mensagem = "";

	$http.get('http://localhost:8085/api/microservice')
	.success(function (microservices) {
		$scope.microservices = microservices;
	})
	.error(function (error) {
		console.log(error);
	});

	$scope.contarRequisicoes = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		$http({method: 'GET', url: url, headers: {
		    'MSQL-REGISTER': 'COUNT'}, micro
		}).success(function () {
			$scope.mensagem = "Contador de Requisições Registrado para o Serviço " + micro.nome;
		});
	};

	$scope.contarErros = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		$http({method: 'POST', url: url, headers: {
		    'MSQL-REGISTER': 'ERROR-COUNTER'}, micro
		}).success(function () {
			$scope.mensagem = "Contador de Erros Registrado para o Serviço";
		});
	};

	$scope.consumoMemoria = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		$http({method: 'POST', url: url, headers: {
		    'MSQL-REGISTER': 'MEMORY-USAGE'}, micro
		}).success(function () {
			$scope.mensagem = "Verificar Consumo de Memória para o Serviço " + micro.nome;
		});
	};

	$scope.obterEstatisticas = function (micro) {
		CompartilharDadosService.setMicro(micro);
	}

});