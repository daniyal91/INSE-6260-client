angular.module('app').controller('LogoutCtrl',function($scope,chssAuth,chssCookies,$rootScope,$state){

	$scope.logout = function() {
		$rootScope.user = {};
		$rootScope.isAuthenticated = false;
		chssAuth.setToken("");
		chssAuth.setAuthenticated(false);
		chssCookies.remove("token");
		chssCookies.remove("user");
		$state.go('home');
	};

	$scope.logout();

});