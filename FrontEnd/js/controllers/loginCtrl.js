vCadastroUsuarios.controller("loginCtrl", function($scope, loginAPI, $location){
    $scope.logar = function(login){
		loginAPI.doLogin(login).success(function (data) {
            $location.path('/usuarios');
            //console.log(data.token);
            localStorage.setItem('currentUser', JSON.stringify({ token: data.token }));

        });        
    }
});