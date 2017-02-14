/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * CategoriesService - service
 */
angular
    .module('oss')
    .service('CategoriesService', CategoriesService);

function CategoriesService($rootScope, $http, $q, API) {
	this.getCategories = function(id) {
        return $http({
            method    : 'GET',
            url       :  API.base + API.category_all,
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
