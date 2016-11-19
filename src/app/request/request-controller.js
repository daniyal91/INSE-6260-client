angular.module('app').controller('RequestCtrl',function($scope,$rootScope,$state,requestService){

	$scope.newRequest = {patientId: $scope.user.id, preferredDate: "", preferredTime: "", preferredLocation: "", serviceId: ""};

	$scope.init = function()
	{
		if(!$rootScope.isAuthenticated)
		{
			$state.go('login');
		}
		$scope.user = $rootScope.user;
		$scope.getServices();
	};

	$scope.getServices = function()
	{
		requestService.serviceResource.query(function(data){
			$scope.services = data;
		});
	};

	$scope.createRequest = function()
	{
		requestService.requestResource.save($scope.newRequest, function(data){
			$state.go("patient-dashboard");
		});
	}

});