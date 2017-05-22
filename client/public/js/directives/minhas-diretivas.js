angular.module('minhasDiretivas', [])
.directive('painel', function () {
	
	var ddo = {};

	ddo.restrict = 'AE';
	ddo.scope = {
		nome : "@"
	};
	ddo.transclude = true;
	ddo.templateUrl = 'js/directives/templates/meu-painel.html';

	console.log(ddo);

	return ddo;
});