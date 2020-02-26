angular.module("jwtRenew", []);
angular.module("jwtRenew").provider("jwtRenew", function () {

	this.$get = function () {
		return {
			renew: function () {
				var currentUser = JSON.parse(localStorage.getItem('currentUser'));
				var token = currentUser.token;

				return null;//tokenAPI.renewToken({token:token});
			}

		};
	};
});