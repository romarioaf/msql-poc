angular.module('msqlpoc',['ngRoute', 'minhasDiretivas', 'minhasContantes', 'chart.js', 
	'ui.bootstrap'])
.config(function ($routeProvider, $httpProvider) {

	$httpProvider.defaults.useXDomain = true;
  	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider.when('/microservico', {
		templateUrl: 'partials/principal.html',
		controller: 'MicroservicesController'
	});

	$routeProvider.when('/microservico/new', {
		templateUrl: 'partials/microservice.html',
		controller: 'MicroserviceController'
	});

	$routeProvider.when('/estatistica', {
		templateUrl: 'partials/estatisticas.html',
		controller: 'EstatisticaController'
	});

	$routeProvider.when('/microservico/edit/:microId', {
		templateUrl: 'partials/microservice.html',
		controller: 'MicroserviceController'
	});

	//$routeProvider.otherwise({redirectTo: '/microservico'});
	$routeProvider.otherwise({ redirectTo: '/microservico' });

});

angular.module("minhasContantes", [])
.constant('apiMicroservice', 'http://127.0.0.1:8085/api/microservice');