angular.module('app').factory('requestService',function($http,$q,$resource) {

    var requestService = {};

    requestService.serviceResource = $resource('http://localhost:3000/services/:id', {}, {
			query: {method: 'GET', isArray: true},
			save: {method: 'POST'},
			update: {method: 'PUT'},
			delete: {method: 'DELETE'}
		});

		requestService.requestResource = $resource('http://localhost:3000/requests/:id', {}, {
			query: {method: 'GET', isArray: false},
			save: {method: 'POST'},
			update: {method: 'PUT'},
			delete: {method: 'DELETE'}
		});

    return requestService;
});