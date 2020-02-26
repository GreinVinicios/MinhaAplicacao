vCadastroUsuarios.factory("tokenAPI", function ($http, config) {
	var _renewToken = function () {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		var token = currentUser.token;
		var body = {token: 'Bearer '+token}		

		return $http.post(config.baseUrl + "/renew", body);		
	};
 
	return {
		renewToken: _renewToken
	};
});