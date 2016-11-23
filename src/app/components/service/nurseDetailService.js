angular.module('app').factory('nurseDetailService',function($http,$q,$resource) {

    var nurseDetailService = {};

    nurseDetailService.resource = $resource('http://localhost:3000/nurse_details/:id', {}, {
			query: {method: 'GET', isArray: true},
			save: {method: 'POST'},
			update: {method: 'PUT'},
			delete: {method: 'DELETE'}
		});

		nurseDetailService.updateDetail = function(data){
	    var deferred = $q.defer();
	    $http.put('http://localhost:3000/nurse_details/update_detail',data)
	      .then(function(data){
	        deferred.resolve(data);
	      },
	      function(data){
	        deferred.reject(data);
	      });
	    return deferred.promise;
	  };

	  nurseDetailService.removeDetail = function(data){
	    var deferred = $q.defer();
	    $http.put('http://localhost:3000/nurse_details/remove_detail',data)
	      .then(function(data){
	        deferred.resolve(data);
	      },
	      function(data){
	        deferred.reject(data);
	      });
	    return deferred.promise;
	  };

    return nurseDetailService;
});