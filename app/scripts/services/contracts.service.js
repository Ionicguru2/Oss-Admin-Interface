/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * ContractsService - service
 */
angular
    .module('oss')
    .service('ContractsService', ContractsService);

function ContractsService($rootScope, $http, $q, API, Upload) {
	this.getContracts = function() {
		var defer = $q.defer();

		$http({
          	method    : 'GET',
          	url       :  API.base + API.contract,
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

	this.deleteContract = function(id) {
		return $http({
          	method    : 'DELETE',
          	url       :  API.base + API.contract_delete + id,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            data: {
                _rest_token:  $rootScope.rest_token
            }
        })
        .success(function(data, status, headers, config) {
          	// console.log('deleted: ', data);
        })
        .error(function(data, status, headers, config) {
          	// console.log('delete error: ', data);
        });
	};

	this.createContract = function(data) {
		data._rest_token = $rootScope.rest_token;
		if (data.document) {
			return Upload.upload({
				url: API.base + API.contract_create,
				data: data
			});
		} else {
			return $http({
	          	method    : 'POST',
	          	url       :  API.base + API.contract_create,
	          	dataType  : 'json',
	          	headers: {
	                'Content-Type': 'multipart/form-data'
	            },
	            params: data
	        })
	        .success(function(data, status, headers, config) {
	          	// console.log('created: ', data);
	        })
	        .error(function(data, status, headers, config) {
	          	// console.log('create error: ', data);
	        });
	    }
	};

	this.editContract = function(data) {
		data._rest_token = $rootScope.rest_token;
		if (data.document) {
			return Upload.upload({
				url: API.base + API.contract_create,
				data: data
			});
		} else {
			return $http({
	          	method    : 'POST',
	          	url       :  API.base + API.contract_edit,
	          	dataType  : 'json',
	          	headers: {
	                'Content-Type': 'multipart/form-data'
	            },
	            params: data
	        })
	        .success(function(data, status, headers, config) {
	          	// console.log('created: ', data);
	        })
	        .error(function(data, status, headers, config) {
	          	// console.log('create error: ', data);
	        });
	    }
	};

	this.getContract = function(id) {
		return $http({
          	method    : 'GET',
          	url       :  API.base + API.contracts_for_user + id,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            data: {
                _rest_token:  $rootScope.rest_token
            }
        })
        .success(function(data, status, headers, config) {
          	// console.log('fetched: ', data);
        })
        .error(function(data, status, headers, config) {
          	// console.log('fetch error: ', data);
        });
	};
}
