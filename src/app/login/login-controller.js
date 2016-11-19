angular.module('app').controller('LoginCtrl',function($scope,chssAuth,$q,$state){

	$scope.userCredentials = {username:"", password:""};
	$scope.loginError = false;

	$scope.login = function(username,password) {
		if(username !== "" && password !== "")
		{
			$scope.loginError = false;
			var deferred = $q.defer();
			var credentials = {username: username, password: password};
			chssAuth.login(credentials).then(function(res){
				if(res.data.user)
				{
					deferred.resolve("ok");
				}
				},function(res){
					deferred.reject("false");
				});
			return deferred.promise;
		}
		else
		{
			$scope.loginError = true;
		}
	};
	
});