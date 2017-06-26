angular.module('minhasDiretivas', [])
.directive('painel', function () {
	
	var ddo = {};

	ddo.restrict = 'AE';
	ddo.scope = {
		nome : "@"
	};
	ddo.transclude = true;
	ddo.templateUrl = 'js/directives/templates/meu-painel.html';

	return ddo;
})
.directive('menu', function () {
	
	var ddo = {};

	ddo.restrict = 'AE';
	/*ddo.scope = {
		nome : "@"
	};*/
	ddo.transclude = true;
	ddo.templateUrl = 'js/directives/templates/menu.html';

	return ddo;
});