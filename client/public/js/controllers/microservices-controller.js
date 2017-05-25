angular.module('msqlpoc').controller('MicroservicesController', 
	function ($scope, $http, $routeParams) {
	
	$scope.microservices = [];

	$http.get('http://localhost:8085/api/microservice')
	.success(function (microservices) {
		$scope.microservices = microservices;
	})
	.error(function (error) {
		console.log(error);
	});

	$scope.contarRequisicoes = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		$http({method: 'POST', url: url, headers: {
		    'MSQL-REGISTER': 'COUNT'}, micro
		});
	};

	$scope.contarErros = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		$http({method: 'POST', url: url, headers: {
		    'MSQL-REGISTER': 'ERROR-COUNTER'}, micro
		});
	};

	$scope.consumoMemoria = function (micro) {
		var url = "http://" + micro.ip_servidor + ":" + micro.porta + micro.path;
		$http({method: 'POST', url: url, headers: {
		    'MSQL-REGISTER': 'MEMORY-USAGE'}, micro
		});
	};

});