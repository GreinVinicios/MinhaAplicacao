//ativa os interceptors
vCadastroUsuarios.config(function ($httpProvider) {
	$httpProvider.interceptors.push("urlInterceptor");
	$httpProvider.interceptors.push("errorInterceptor");
	$httpProvider.interceptors.push("loadingInterceptor");
});