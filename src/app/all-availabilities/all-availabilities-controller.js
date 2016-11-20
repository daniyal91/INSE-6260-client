angular.module('app').controller('AllAvailabilitiesCtrl',function($scope,$rootScope,$state,availabilityService){

	$scope.init = function()
	{
		if(!$rootScope.isAuthenticated)
		{
			$state.go('login');
		}
		$scope.user = $rootScope.user;
		$scope.getAvailabilities();
	};

	$scope.getAvailabilities = function()
	{
		availabilityService.resource.query({nurse_id: $rootScope.user.id},function(data){
			$scope.availabilities = data.nurse_availabilities;
		});
	};

});