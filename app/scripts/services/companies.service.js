/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * CompaniesService - service
 */
angular
    .module('oss')
    .service('CompaniesService', CompaniesService);

function CompaniesService($rootScope, $http, $q, API) {
	this.getCompanies = function() {
		var defer = $q.defer();

		$http({
          	method    : 'GET',
          	url       :  API.base + API.company_all,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: { _rest_token:  $rootScope.rest_token }
        })
        .success(function(data, status, headers, config) {
          	defer.resolve(data);
        })
        .error(function(data, status, headers, config) {
          	defer.reject(data);
        });

        return defer.promise;
	};

	this.updateCompany = function(company) {
		company._rest_token = $rootScope.rest_token;
		return $http({
          	method    : 'POST',
          	url       :  API.base + API.company_id + company.id,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: company
        })
        .success(function(data, status, headers, config) {
          	console.log('updated company: ', data);
        })
        .error(function(data, status, headers, config) {
          	console.log('company update error: ', data);
        });
	};

	this.createCompany = function(company) {
		company._rest_token = $rootScope.rest_token;
		return $http({
          	method    : 'POST',
          	url       :  API.base + API.company_create,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: company
        })
        .success(function(data, status, headers, config) {
          	console.log('created company: ', data);
        })
        .error(function(data, status, headers, config) {
          	console.log('company create error: ', data);
        });
	};

	this.deleteCompany = function(id) {
		return $http({
          	method    : 'DELETE',
          	url       :  API.base + API.company_id + id,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: {
            	_rest_token: $rootScope.rest_token,
            	id: id
            }
        })
        .success(function(data, status, headers, config) {
          	console.log('deleted company: ', data);
        })
        .error(function(data, status, headers, config) {
          	console.log('company delete error: ', data);
        });
	};

	this.getCompany = function(id) {
		return $http({
          	method    : 'GET',
          	url       :  API.base + API.company_id + id,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: {
            	_rest_token: $rootScope.rest_token,
            	id: id
            }
        })
        .success(function(data, status, headers, config) {
          	console.log('fetched company: ', data);
        })
        .error(function(data, status, headers, config) {
          	console.log('company fetch error: ', data);
        });
	};
}
