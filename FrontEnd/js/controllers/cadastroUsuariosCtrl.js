vCadastroUsuarios.controller("cadastroUsuariosCtrl", function ($scope, $q, usuarios, operadoras, usuariosAPI, tokenAPI) {
	$scope.usuarios = usuarios.data.user;	
	$scope.operadoras = operadoras.data;

	//renovação do token
	tokenAPI.renewToken().success(function(data){		
		localStorage.setItem('currentUser', JSON.stringify(data));
	});

	$scope.apagarusuarios = function (usuarios) {
		$scope.deletarUsuarioAPI(usuarios).then(function(){
			delete $scope.usuarios;
			setTimeout(function(){
				usuariosAPI.getUsuarios().success(function(data){
					$scope.usuarios = data.user;
				});
			}, 100);			
		});				
	};

	$scope.deletarUsuarioAPI = function(usuarios) {
		return $q(function (resolve, reject) {
			usuarios.filter(function (usuario) {
				if (usuario.selecionado) {
					usuariosAPI.delUsuario(usuario._id);
				}
				resolve();
			});
		});
	};

	$scope.verificarusuarioselecionado = function (usuarios) {
		$scope.hasusuarioselecionado = usuarios.some(function (usuario) {
			return usuario.selecionado;
		});
	};
});