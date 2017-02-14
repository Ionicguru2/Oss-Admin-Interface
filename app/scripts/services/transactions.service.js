/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * TransactionsService - service
 */
angular
    .module('oss')
    .service('TransactionsService', TransactionsService);

function TransactionsService($rootScope, $http, $q, API) {

	this.getTransactions = function() {
		return $http({
          	method    : 'GET',
          	url       :  API.base + API.transaction_all,
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

	this.getCompanyTransactions = function(companyId) {
		return $http({
          	method    : 'GET',
          	url       :  API.base + API.transaction_company + companyId,
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

	this.getUserTransactions = function(userId) {
		return $http({
          	method    : 'GET',
          	url       :  API.base + API.transaction_user + userId,
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

	this.approveTransaction = function(transactionId) {
		return $http({
          	method    : 'GET',
          	url       :  API.base + API.transaction_approve.replace('{id}', transactionId),
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: {
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

	this.denyTransaction = function(transactionId) {
		return $http({
          	method    : 'GET',
          	url       :  API.base + API.transaction_deny.replace('{id}', transactionId),
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: {
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

  this.approveValidation = function(transactionId) {
    return $http({
            method    : 'GET',
            url       :  API.base + API.validation_approve.replace('{id}', transactionId),
            dataType  : 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
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

  this.denyValidation = function(transactionId) {
    return $http({
            method    : 'GET',
            url       :  API.base + API.validation_deny.replace('{id}', transactionId),
            dataType  : 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
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
