/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * CountriesService - service
 */
angular
    .module('oss')
    .service('CountriesService', CountriesService);

function CountriesService($rootScope, $http, $q, API) {
	this.getCountries = function(id) {
        return $http({
            method    : 'GET',
            url       :  API.base + API.country_all,
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
