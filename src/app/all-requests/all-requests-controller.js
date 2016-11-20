angular.module('app').controller('AllRequestsCtrl',function($scope,$rootScope,$state,requestService){

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
		requestService.requestResource.query({patient_id: $rootScope.user.id},function(data){
			$scope.requests = data.requests;
		});
	};
	
});