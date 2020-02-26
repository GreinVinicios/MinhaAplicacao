vCadastroUsuarios.controller("detalhesUsuarioCtrl", function ($scope, usuario, operadoras, usuariosAPI, $location) {	
	$scope.usuario = usuario.data.user;
	$scope.operadoras = operadoras.data;

	//renovação do token
	tokenAPI.renewToken().success(function(data){		
		localStorage.setItem('currentUser', JSON.stringify(data));
	});

	$scope.isEditing = function(editando) {
		$scope.editando = editando;
	};

	$scope.editarusuario = function (usuario) {
		var id = usuario._id;
		delete usuario.dataCriacao;
		delete usuario._id;
		delete usuario.email;		

		usuariosAPI.updtUsuario(id,usuario).success(function (data) {
			delete $scope.usuario;
			//setPristine = indica se o campo já foi "tocado" alguma vez, neste caso está setando dizendo que não
			$scope.usuarioForm.$setPristine();
			$location.path("/usuarios");
		});

		$scope.editando = false;
	};
});