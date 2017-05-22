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

});