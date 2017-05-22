angular.module('msqlpoc',['ngRoute', 'minhasDiretivas'])
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

	$routeProvider.otherwise({redirectTo: '/microservico'});

});