/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * ProductsService - service
 */
angular
    .module('oss')
    .service('ProductsService', ProductsService);

function ProductsService($rootScope, $http, $q, API) {
	this.getProducts = function() {
		var defer = $q.defer();

		$http({
          	method    : 'GET',
          	url       :  API.base + API.product_all,
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

	this.updateProduct = function(product) {
		product._rest_token = $rootScope.rest_token;
		return $http({
          	method    : 'POST',
          	url       :  API.base + API.product_id + product.id,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: product
        })
        .success(function(data, status, headers, config) {
          	console.log('updated product: ', data);
        })
        .error(function(data, status, headers, config) {
          	console.log('product update error: ', data);
        });
	};

	this.createProduct = function(product) {
		product._rest_token = $rootScope.rest_token;
		return $http({
          	method    : 'POST',
          	url       :  API.base + API.product_create,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: product
        })
        .success(function(data, status, headers, config) {
          	console.log('created product: ', data);
        })
        .error(function(data, status, headers, config) {
          	console.log('product create error: ', data);
        });
	};

	this.deleteProduct = function(id) {
		return $http({
          	method    : 'DELETE',
          	url       :  API.base + API.product_id + id,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: {
            	_rest_token: $rootScope.rest_token
            }
        })
        .success(function(data, status, headers, config) {
          	console.log('deleted product: ', data);
        })
        .error(function(data, status, headers, config) {
          	console.log('product delete error: ', data);
        });
	};

	this.getProduct = function(id) {
		return $http({
          	method    : 'GET',
          	url       :  API.base + API.product_id + id,
          	dataType  : 'json',
          	headers: {
                'Content-Type': 'application/json'
            },
            params: {
            	_rest_token: $rootScope.rest_token
            }
        })
        .success(function(data, status, headers, config) {
          	console.log('fetched product: ', data);
        })
        .error(function(data, status, headers, config) {
          	console.log('product fetch error: ', data);
        });
	};
}
