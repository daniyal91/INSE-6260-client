angular.module('app').controller('PatientDashboardCtrl',function($scope,$rootScope,$state,requestService){

	$scope.init = function()
	{
		if(!$rootScope.isAuthenticated)
		{
			$state.go('login');
		}
		$scope.user = $rootScope.user;
	};

});