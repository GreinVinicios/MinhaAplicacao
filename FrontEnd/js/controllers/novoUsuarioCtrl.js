vCadastroUsuarios.controller("novoUsuarioCtrl", function ($scope, usuariosAPI, $location, operadoras) {
	$scope.operadoras = operadoras.data;

	//renovação do token
	tokenAPI.renewToken().success(function(data){		
		localStorage.setItem('currentUser', JSON.stringify(data));
	});

	$scope.adicionarusuario = function (usuario) {				
		usuariosAPI.saveUsuario(usuario).success(function (data) {
			delete $scope.usuario;
			$scope.usuarioForm.$setPristine();
			$location.path("/usuarios");
		});
	};
});