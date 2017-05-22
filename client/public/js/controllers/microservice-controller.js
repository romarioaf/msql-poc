angular.module('msqlpoc').controller('MicroserviceController', 
	function ($scope, $http, $routeParams) {
	
	$scope.micro = {};
	$scope.mensagem = '';

	$scope.submeter = function () {

		console.log("coisa");

		if($scope.formulario.$valid) {

			if ($scope.micro._id) {

				$http.put('http://localhost:8085/api/microservice' + $scope.micro._id, $scope.micro)
				.success(function () {
					$scope.mensagem = 'Microserviço Alterado com sucesso';
				})
				.error(function (error) {
					$scope.mensagem = 'Erro ao Alterar Microserviço';
				});

			} else {
				$http.post('http://localhost:8085/api/microservice', $scope.micro)
				.success(function () {
					$scope.mensagem = 'Microserviço incluído com sucesso';
				})
				.error(function (error) {
					$scope.mensagem = 'Erro ao incluir Microserviço';
				});
			}
		}
	};

});