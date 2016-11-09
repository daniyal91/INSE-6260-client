angular.module('app').controller('LoginCtrl',function($scope){

	$scope.userCredentials = {username:"", password:""};
	$scope.loginError = false;

	$scope.login = function(username,password) {
		if(username !== "" && password !== "")
		{
			$scope.loginError = false;
		}
		else
		{
			$scope.loginError = true;
		}
	};

});