vCadastroUsuarios.factory("usuariosAPI", function ($http, config) {
	var _getUsuarios = function () {
		return $http.get(config.baseUrl + "/me/users", 
		//{headers: {'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNGM2YmY4NWI3MWJjMTBhMGZiZTRkNSIsImlhdCI6MTU4MjU4NDI5MywiZXhwIjoxNTgyNjc0MjkzfQ.2oprf3va05Pe2Rhg3dQ3DhLUQiDhgmpOoKN_SlIWov4'}}
		);
	};

	var _getUsuario = function (id) {
		return $http.get(config.baseUrl + "/me/user/" + id);
	};

	var _saveUsuario = function (usuario) {
		return $http.post(config.baseUrl + "/me/user/", usuario);
	};

	var _delUsuario = function (id) {
		return $http.delete(config.baseUrl + "/me/user/" + id);
	};

	var _updtUsuario = function (id,usuario) {		
		return $http.patch(config.baseUrl + "/me/user/" + id, usuario);
	};

	return {
		getUsuarios: _getUsuarios,
		getUsuario: _getUsuario,
		saveUsuario: _saveUsuario,
		delUsuario: _delUsuario,
		updtUsuario: _updtUsuario
	};
});