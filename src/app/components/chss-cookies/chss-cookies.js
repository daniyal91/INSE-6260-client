angular.module('app').factory('chssCookies',function($cookieStore) {

    var chssCookies = {};

    chssCookies.set = function(key,value){
			$cookieStore.put(key,value);
		};

		chssCookies.get = function(key){
			return $cookieStore.get(key);
		};

		chssCookies.remove = function(key){
			$cookieStore.remove(key);
		};

    return chssCookies;
});