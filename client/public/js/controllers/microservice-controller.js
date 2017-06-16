angular.module('msqlpoc').controller('MicroserviceController',
	function ($scope, $http, $routeParams, apiMicroservice) {
	
	$scope.micro = {};
	$scope.mensagem = '';

	if ($routeParams.microId) {
		$http.get(apiMicroservice + '/' + $routeParams.microId)
		.success(function (micro) {
			$scope.micro = micro;
			console.log($scope.micro);
		})
		.error(function (error) {
			
		});
	}

	$scope.submeter = function () {

		if($scope.formulario.$valid) {

			if ($scope.micro.id) {

				$http.put(apiMicroservice, $scope.micro)
				.success(function () {
					$scope.mensagem = 'Microserviço Alterado com sucesso';
				})
				.error(function (error) {
					$scope.mensagem = 'Erro ao Alterar Microserviço';
				});

			} else {
				$http.post(apiMicroservice, $scope.micro)
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