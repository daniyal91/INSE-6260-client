angular.module('app').controller('NurseDashboardCtrl',function($scope,$rootScope,$state){

	$scope.init = function()
	{
		if(!$rootScope.isAuthenticated)
		{
			$state.go('login');
		}
		$scope.user = $rootScope.user;
	};

});