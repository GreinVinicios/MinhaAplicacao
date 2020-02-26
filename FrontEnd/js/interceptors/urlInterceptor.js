vCadastroUsuarios.factory("urlInterceptor", function () {
	return {		
		request: function (config) {			
			var url = config.url;
			if (url.indexOf('view') > -1) return config;
			var timestamp = new Date().getTime();
			
			var currentUser = JSON.parse(localStorage.getItem('currentUser'));
			var token = currentUser.token;

			if (!config.url.includes('/renew')) {				
				if (config.url.includes('/me/')) {				
					config.headers.Authorization = 'Bearer '+token;
				} else {
					config.url = url + "?timestamp=" + timestamp; //serve para não cachear as requisições
				}
			}
		
			return config;
		}
	};
});