angular.module('msqlpoc').controller('MicroservicesController', 
	function ($scope, $http, $routeParams, CompartilharDadosService, apiMicroservice, $window) {
	
	$scope.microservices = [];
	$scope.mensagem = "";
	$scope.mensagemError = "";

	populaMicroservices();

	$scope.registraContarRequisicoes = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		limpaMensagens();
		$http({method: 'GET', url: url, headers: {'MSQL-REGISTER': 'COUNT'}, micro
		}).success(function () {
			$scope.mensagem = "Contador de Requisições Registrado para o Serviço " + micro.nome;

			registraCount(micro, populaMicroservices);
		}).error(function (error) {
			populaMensagemError();
		});
	};

	$scope.desregistraContarRequisicoes = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		limpaMensagens();
		$http({method: 'GET', url: url, headers: {'MSQL-UNREGISTER': 'COUNT'}, micro
		}).success(function () {
			$scope.mensagem = "Contador desregistrado para o Serviço " + micro.nome;

			desregistraCount(micro, populaMicroservices);
		});
	};

	$scope.contarErros = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		limpaMensagens();
		$http({method: 'GET', url: url, headers: {'MSQL-REGISTER': 'ERROR-COUNTER'}, micro
		}).success(function () {
			$scope.mensagem = "Contador de Erros Registrado para o Serviço";
		}).error(function (error) {
			populaMensagemError();
		});
	};

	$scope.consumoMemoria = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		limpaMensagens();
		$http({method: 'GET', url: url, headers: {'MSQL-REGISTER': 'MEMORY-USAGE'}, micro
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

	function registraCount(micro, callback) {
		$http({method: 'PUT', url: apiMicroservice+"/"+micro.id+"/registraCount", micro
		}).success(function () {
			console.info("Status atualizado");
			if (callback)
				callback();
		}).error(function (error) {
			console.error(error);
		});
	}

	function desregistraCount(micro, callback) {
		$http({method: 'PUT', url: apiMicroservice+"/"+micro.id+"/desregistraCount", micro
		}).success(function () {
			console.info("Status atualizado");
			if (callback)
				callback();
		}).error(function (error) {
			console.error(error);
		});
	}	

	function populaMicroservices() {
		$http.get(apiMicroservice)
		.success(function (microservices) {
			$scope.microservices = microservices;
			//$window.localStorage["microservices"] = $scope.microservices;

			angular.forEach($scope.microservices, function(value, key){
		      value.countRegistrado = false;
		      if(value.status_count == 'REGISTER')
		         value.countRegistrado = true;

		   	});
		})
		.error(function (error) {
			console.log(error);
		});
	}
});