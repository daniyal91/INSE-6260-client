angular.module('app').controller('RegisterCtrl',function($scope,userService){

	$scope.newUser = {firstName:"", lastName:"", email:"", username:"", password:"", confirmPassword:"", gender:"", language:"", address:"", type:""};
	$scope.registerError = false;
	$scope.passwordMatchError = false;

	$scope.register = function() {
		if($scope.newUser.firstName !== "" && $scope.newUser.lastName !== "" && $scope.newUser.email !== "" && $scope.newUser.username !== "" && $scope.newUser.password !== "" && $scope.newUser.confirmPassword !== "" && $scope.newUser.gender !== "" && $scope.newUser.language !== "" && $scope.newUser.address !== "" && $scope.newUser.type !== "")
		{
			$scope.registerError = false;
			if($scope.newUser.password !== $scope.newUser.confirmPassword)
			{
				$scope.passwordMatchError = true;
			}
			else
			{
				$scope.passwordMatchError = false;
				userService.resource.save($scope.newUser, function(data){
					console.log(data);
				});
			}
		}
		else
		{
			$scope.registerError = true;
		}
	};

});