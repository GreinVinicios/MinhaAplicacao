vCadastroUsuarios.factory("errorInterceptor", function ($q, $location, $rootScope) {
	return {
		responseError: function (rejection) {
			if (rejection.status >= 400) {
				$rootScope.mensagemErro = rejection.data.error;
				$location.path("/error");
			}
			
			return $q.reject(rejection);
		}
	};
});