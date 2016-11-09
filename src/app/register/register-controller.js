angular.module('app').controller('RegisterCtrl',function($scope){

	$scope.newUser = {firstName:"", lastName:"", email:"", username:"", password:"", confirmPassword:"", gender:"", language:"", address:""};
	$scope.registerError = false;
	$scope.passwordMatchError = false;

	$scope.register = function() {
		if($scope.newUser.firstName !== "" && $scope.newUser.lastName !== "" && $scope.newUser.email !== "" && $scope.newUser.username !== "" && $scope.newUser.password !== "" && $scope.newUser.confirmPassword !== "" && $scope.newUser.gender !== "" && $scope.newUser.language !== "" && $scope.newUser.address !== "")
		{
			$scope.registerError = false;
			if($scope.newUser.password !== $scope.newUser.confirmPassword)
			{
				$scope.passwordMatchError = true;
			}
			else
			{
				$scope.passwordMatchError = false;
			}
		}
		else
		{
			$scope.registerError = true;
		}
	};

});