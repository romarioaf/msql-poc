angular.module('msqlpoc',['ngRoute', 'minhasDiretivas', 'chart.js'])
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

	$routeProvider.otherwise({redirectTo: '/microservico'});

});