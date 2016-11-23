angular.module('app').controller('NurseDetailsCtrl',function($scope,$rootScope,$state,requestService,nurseDetailService){

	$scope.init = function()
	{
		if(!$rootScope.isAuthenticated)
		{
			$state.go('login');
		}
		$scope.user = $rootScope.user;
		$scope.getServices();
		$scope.getNurseSkills();
	};

	$scope.nurseSkills = [];
	$scope.notNurseSkills = [];
	$scope.selectedNurseSkills = {};

	$scope.getServices = function()
	{
		requestService.serviceResource.query(function(data){
			$scope.allServices = data;
		});
	};

	$scope.updateSkils = function()
	{
		var selectedSkills = [];
		var notSelectedSkills = [];
		angular.forEach($scope.selectedNurseSkills, function(value, key){
			if(value === true)
			{
				nurseDetailService.updateDetail({nurse_id: $scope.user.id, service_id: key}).then(function(data){
	        console.log(data);
	      });
			}
			else
			{
				nurseDetailService.removeDetail({nurse_id: $scope.user.id, service_id: key}).then(function(data){
	        console.log(data);
	      });
			}
		});
		$state.go('nurse-details-all');
	};

	$scope.getNurseSkills = function()
	{
		nurseDetailService.resource.query({nurse_id: $scope.user.id},function(data){
			var nurseSkills = _.map(data, 'service_id');
			var notNurseSkills = _.difference(_.map($scope.allServices, 'id'), nurseSkills);
			angular.forEach(notNurseSkills, function(value, key) {
			  $scope.notNurseSkills.push(_.find($scope.allServices, {'id': value}));
			  var skill = _.find($scope.allServices, {'id': value}).id;
			  $scope.selectedNurseSkills[skill] = false;
			});
			angular.forEach(nurseSkills, function(value, key) {
			  $scope.nurseSkills.push(_.find($scope.allServices, {'id': value}));
			  var skill = _.find($scope.allServices, {'id': value}).id;
			  $scope.selectedNurseSkills[skill] = true;
			});
		});
	};

});