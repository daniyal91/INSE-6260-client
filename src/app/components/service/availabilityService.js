angular.module('app').factory('availabilityService',function($http,$q,$resource) {

    var availabilityService = {};

    availabilityService.resource = $resource('http://localhost:3000/nurse_availabilities/:id', {}, {
			query: {method: 'GET', isArray: false},
			save: {method: 'POST'},
			update: {method: 'PUT'},
			delete: {method: 'DELETE'}
		});

    return availabilityService;
});