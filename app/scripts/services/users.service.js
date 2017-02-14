/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * UsersService - service
 */
angular
    .module('oss')
    .service('UsersService', UsersService);

function UsersService($rootScope, $http, $q, API) {
	this.login = function(data) {
		var defer = $q.defer();

		$http({
          	method    : 'POST',
          	url       : API.base + API.user_login,
          	dataType  : 'json',
          	params: {
              username: data.email,
              password: data.password
            },
          	headers: {
	            // 'Content-Type': 'application/x-www-form-urlencoded'
	            'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
	        }
        })
        .success(function(data, status, headers, config) {
          	defer.resolve(data);
        })
        .error(function(data, status, headers, config) {
          	defer.reject(data);
        });

        return defer.promise;
	};

	this.create = function(data) {
		data._rest_token = $rootScope.rest_token;
		var defer = $q.defer();

		$http({
          	method    : 'POST',
          	url       : API.base + API.user_create,
          	dataType  : 'json',
          	headers: {
          		'Content-Type': 'multipart/form-data'
          	}, 
          	params: data
        })
        .success(function(data, status, headers, config) {
          	defer.resolve(data);
        })
        .error(function(data, status, headers, config) {
          	defer.reject(data);
        });

        return defer.promise;
	};

  	this.remove = function(id) {
      	var defer = $q.defer();

      	$http({
          	method    : 'DELETE',
          	url       : API.base + API.user_id + id,
          	dataType  : 'json',
          	params: {
              	_rest_token: $rootScope.rest_token
          	}
      	})
      	.success(function(data, status, headers, config) {
          	defer.resolve(data);
      	})
      	.error(function(data, status, headers, config) {
          	defer.reject(data);
      	});

      	return defer.promise;
    };

    this.suspend = function(id) {
        var defer = $q.defer();

        $http({
            method    : 'DELETE',
            url       : API.base + API.user_id + id,
            dataType  : 'json',
            params: {
                _rest_token: $rootScope.rest_token
            }
        })
        .success(function(data, status, headers, config) {
            defer.resolve(data);
        })
        .error(function(data, status, headers, config) {
            defer.reject(data);
        });

        return defer.promise;
    };

    this.logout = function() {
        var defer = $q.defer();

        $http({
            method    : 'POST',
            url       : API.base + API.user_logout,
            dataType  : 'json',
            params: {
                _rest_token: $rootScope.rest_token
            }
        })
        .success(function(data, status, headers, config) {
            defer.resolve(data);
        })
        .error(function(data, status, headers, config) {
            defer.reject(data);
        });

        return defer.promise;
    }
    
	this.getInternalUsers = function() {
		var defer = $q.defer();

		$http({
	      	method    : 'GET',
	      	url       :  API.base + API.user_all,
	      	dataType  : 'json',
	      	headers: {
	            // 'Content-Type': 'application/x-www-form-urlencoded'
	            'Content-Type': 'application/json'
	        },
	        data: {
	            _rest_token:  $rootScope.rest_token
	        }
	    })
	    .success(function(data, status, headers, config) {
	      	defer.resolve(data);
	    })
	    .error(function(data, status, headers, config) {
	      	defer.reject(data);
	    });

	    return defer.promise;
	};

	this.updateUserInfo = function(userData) {
		userData._rest_token = $rootScope.rest_token;
      	var defer = $q.defer();

      	$http({
          	method    : 'POST',
          	url       : API.base + API.user_id + userData.id,
          	dataType  : 'json',
          	params : userData
      	})
      	.success(function(data, status, headers, config) {
          	defer.resolve(data);
      	})
      	.error(function(data, status, headers, config) {
          	defer.reject(data);
      	});

      	return defer.promise;
    };

    this.getUserInfo = function(id) {
      	var defer = $q.defer();

      	$http({
          	method    : 'GET',
          	url       : API.base + API.user_id + id,
          	dataType  : 'json',
          	params: {
              	_rest_token: $rootScope.rest_token
          	}
      	})
      	.success(function(data, status, headers, config) {
          	defer.resolve(data);
      	})
      	.error(function(data, status, headers, config) {
          	defer.reject(data);
      	});

      	return defer.promise;
    };

    this.getRegions = function() {
		return $http({
          	method    : 'GET',
          	url       :  API.base + API.region_all,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: { _rest_token:  $rootScope.rest_token }
        });
    };
}
