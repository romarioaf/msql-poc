angular.module('msqlpoc').controller('MicroservicesController', 
	function ($scope, $http, $routeParams, CompartilharDadosService, apiMicroservice, $window) {
	
	$scope.microservices = [];
	$scope.mensagem = "";
	$scope.mensagemError = "";



	$http.get(apiMicroservice)
	.success(function (microservices) {
		$scope.microservices = microservices;
		$window.localStorage["microservices"] = $scope.microservices;
	})
	.error(function (error) {
		console.log(error);
	});

	$scope.contarRequisicoes = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		limpaMensagens();
		$http({method: 'GET', url: url, headers: {
		    'MSQL-REGISTER': 'COUNT'}, micro
		}).success(function () {
			$scope.mensagem = "Contador de Requisições Registrado para o Serviço " + micro.nome;
		}).error(function (error) {
			populaMensagemError();
		});
	};

	$scope.contarErros = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		limpaMensagens();
		$http({method: 'GET', url: url, headers: {
		    'MSQL-REGISTER': 'ERROR-COUNTER'}, micro
		}).success(function () {
			$scope.mensagem = "Contador de Erros Registrado para o Serviço";
		}).error(function (error) {
			populaMensagemError();
		});
	};

	$scope.consumoMemoria = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		limpaMensagens();
		$http({method: 'GET', url: url, headers: {
		    'MSQL-REGISTER': 'MEMORY-USAGE'}, micro
		}).success(function () {
			$scope.mensagem = "Verificar Consumo de Memória para o Serviço " + micro.nome;
		}).error(function (error) {
			populaMensagemError()
		});
	};

	$scope.obterEstatisticas = function (micro) {
		CompartilharDadosService.setMicro(micro);
	}

	function limpaMensagens() {
		$scope.mensagem = "";
		$scope.mensagemError = "";
	};

	function populaMensagemError() {
		$scope.mensagemError = "Microserviço offline ou inexistente";
	}
});