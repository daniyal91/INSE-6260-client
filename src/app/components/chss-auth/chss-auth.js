angular.module('chss.auth', ['ui.router','ngCookies'])

.provider('chssAuth',function(){

	this.config = {
		host: '',
		token: '',
		isAuthenticated: false
	};

	this.setHost = function(host){
		this.config.host = host;
	};

	this.setToken = function(token){
		this.config.token = token;
	};

	this.getToken = function(token){
		return this.config.token;
	};

	var that=this;

	// Define the provider's instance
	this.$get = ['$rootScope','$http','$q','chssCookies',
	function ($rootScope,$http,$q,chssCookies) {
		var factory = {};

		factory.setHost =  function(host){
			that.config.host = host;
		};

		factory.getHost = function(){
			return that.config.host;
		};

		factory.setToken = function(token)
		{
			that.config.token = token;
			chssCookies.set('token',token);
		};

		factory.getToken = function(token)
		{
			return that.config.token;
		};

		factory.setAuthenticated = function(val)
		{
			that.config.isAuthenticated = val;
		};

		factory.getAuthenticated = function()
		{
			return that.config.isAuthenticated;
		};

		factory.updateUserCookies = function(userObj){
			var user = chssCookies.get('user');
			_.each(userObj, function(value, key){
				user[key] = value;
			});
			chssCookies.set('user',user);
		};

		factory.setUserAuthentication = function(data){
			this.setToken(data.data.auth_key.access_token);
			that.config.isAuthenticated = true;
			chssCookies.set('user',data.data.user);
			chssCookies.set('token',data.data.auth_key.access_token);
			chssCookies.set('role',data.data.role);

			$rootScope.user = data.data.user;
			$rootScope.token = data.data.auth_key.access_token;
			$rootScope.role = data.data.role;
			$rootScope.isAuthenticated=true;

			$rootScope.$broadcast('event:auth:successful');
		};

		factory.isAuthenticated = function(){
			
			if(!that.config.isAuthenticated)
			{
				if(chssCookies.get("token"))
				{
					console.log("found token thus setting: "+chssCookies.get("token"));
					this.setToken(chssCookies.get("token"));
					that.config.isAuthenticated = true;
					var user = chssCookies.get("user");
					var token = chssCookies.get("token");
					var role = chssCookies.get("role");
					$rootScope.user = user;
					$rootScope.token = token;
					$rootScope.role = role;
					$rootScope.isAuthenticated = true;
					return true;
				}
			}
			
			return that.config.isAuthenticated;
		};

		factory.login = function(credentials){
			return $http
				.post('http://localhost:3000/session',credentials)
				.then(function(ret){
					// console.log(ret);
					factory.setUserAuthentication(ret);
					return ret;
				},function(res){
					//$rootScope.$broadcast('event:auth:loginFailed');
					//factory.logout();
					return res;
				});
		};
	

		factory.logout = function(){
			$rootScope.user = {};
			$rootScope.isAuthenticated = false;
			$rootScope.role = '';
			this.setToken("");
			that.config.isAuthenticated = false;
			chssCookies.remove("token");
			chssCookies.remove("user"); 
			chssCookies.remove("role"); 
			$rootScope.$broadcast('event:auth:logout');
		};

		return factory;
	}];
})

.config(['$httpProvider','chssAuthProvider', function($httpProvider,chssAuthProvider) {
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	
	// Enable below to send cookies with every http request.
	//$httpProvider.defaults.withCredentials = true;

	$httpProvider.interceptors.push(['$rootScope', '$q', function($rootScope, $q) {
		//var deferred = $q.defer();
		return {
			request: function(config) {
				//console.log(config);
				config.headers.Authorization = chssAuthProvider.getToken();
				//config.timeout = deferred.promise;
				// do something on success
				return config;
			},
			responseError: function(rejection) {
						if (!rejection.config.ignoreAuthModule) {
							switch (rejection.status) {
								case 401:

									console.log("not authorized 401 called");
									$rootScope.$broadcast('event:auth:loginFailed', rejection);
					break;
								case 403:
									$rootScope.$broadcast('event:auth:forbidden', rejection);
									//deferred.resolve("Forbidden");
									break;
								case 500:
					console.log("500 status somethings wrong");
					$rootScope.$broadcast('event:auth:ServerCrash', rejection);
					break;
							}
						}
						// otherwise, default behaviour
						return $q.reject(rejection);
					}
		};
	}]);

}])

.run(function ($modal,$rootScope,$injector,$state,chssAuth,chssCookies) {

	$rootScope.$on('$stateChangeStart', function (event, next) {
		console.log("stateChangeInterceptor");
		// Running this function will automatically authenticate user from cookies
		chssAuth.isAuthenticated();

		if (next.url === '/login' && chssAuth.isAuthenticated()){
			// User is authenticated - No need for Login
			$state.go("home");
			event.preventDefault();
		}

		// if(typeof(next.isPublic)!=='undefined' && next.isPublic===true){
		// 	console.log("public page found: "+next.url);
		// 	return;
		// }

		if(!chssAuth.isAuthenticated())
		{
			console.log("User not authenticated");
			return;
			// event.preventDefault();
			// // $rootScope.$broadcast("event:auth:error");
			// $state.go("home");
		}
		else
		{
			// User is authenticated thus let him view the page.
		}

	});

	$rootScope.$on('event:auth:successful',function(){
		console.log("user is online");
		if(chssCookies.get("role") === "Patient")
		{
			$state.go("patient-dashboard");
		}
		if(chssCookies.get("role") === "Nurse")
		{
			$state.go("home");
		}
		if(chssCookies.get("role") === "Admin")
		{
			$state.go("home");
		}
	});

	$rootScope.$on('event:auth:logout',function(){
		$state.go("login");
	});

});