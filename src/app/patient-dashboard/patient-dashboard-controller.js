angular.module('app').controller('PatientDashboardCtrl',function($scope,$rootScope,$state,requestService){

	$scope.init = function()
	{
		if(!$rootScope.isAuthenticated)
		{
			$state.go('login');
		}
		$scope.user = $rootScope.user;
		$scope.getRequests();
	};

	$scope.getRequests = function()
	{
		requestService.requestResource.query(function(data){
			$scope.requests = data.requests;
		});
	};

});