angular.module('app').controller('AvailabilityCtrl',function($scope,$rootScope,$state,availabilityService){

	$scope.newAvailability = {nurseId: $scope.user.id, availableDate: "", availableTime1: "", availableTime2: "", availableTime3: "", availableTime4: "", availableTime5: ""};

	$scope.init = function()
	{
		if(!$rootScope.isAuthenticated)
		{
			$state.go('login');
		}
		$scope.user = $rootScope.user;
	};

	$scope.createAvailability = function()
	{
		availabilityService.resource.save($scope.newAvailability, function(data){
			$state.go("nurse-dashboard");
		});
	};

});