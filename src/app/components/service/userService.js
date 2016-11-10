angular.module('app').factory('userService',function($http,$q,$resource) {

    var userService = {};

    userService.resource = $resource('http://localhost:3000/users/:id', {}, {
			query: {method: 'GET', isArray: true},
			save: {method: 'POST'},
			update: {method: 'PUT'},
			delete: {method: 'DELETE'}
		});


    return userService;
});