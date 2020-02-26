vCadastroUsuarios.config(function ($routeProvider,$locationProvider) {
$locationProvider.hashPrefix('');

	$routeProvider.when("/login", {
		templateUrl: "view/login.html",
		controller: "loginCtrl"
	});

	$routeProvider.when("/usuarios", {
		templateUrl: "view/usuarios.html",
		controller: "cadastroUsuariosCtrl",
		resolve: {
			usuarios: function (usuariosAPI) {
				return usuariosAPI.getUsuarios();
			},
			operadoras: function (operadorasAPI) {
				return operadorasAPI.getOperadoras();
			}
		}
	});

	$routeProvider.when("/novoUsuario", {
		templateUrl: "view/novoUsuario.html",
		controller: "novoUsuarioCtrl",
		resolve: {
			usuarios: function (usuariosAPI) {
				return usuariosAPI.getUsuarios();
			},
			operadoras: function (operadorasAPI) {
				return operadorasAPI.getOperadoras();
			}
		}
	});

	$routeProvider.when("/detalhesUsuario/:id", {
		templateUrl: "view/detalhesUsuario.html",
		controller: "detalhesUsuarioCtrl",
		resolve: {
			usuario: function (usuariosAPI, $route) {				
				return usuariosAPI.getUsuario($route.current.params.id);
			},
			operadoras: function (operadorasAPI) {
				return operadorasAPI.getOperadoras();
			}
		}
	});

	$routeProvider.when("/error", {
		templateUrl: "view/error.html"
	});
	$routeProvider.otherwise({redirectTo: "/login"});
});
