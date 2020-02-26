vCadastroUsuarios.factory("loginAPI", function ($http, config) {
	var _doLogin = function (login) {
		return $http.post(config.baseUrl + "/auth/login",login);
	};

	return {
		doLogin: _doLogin		
	};
});