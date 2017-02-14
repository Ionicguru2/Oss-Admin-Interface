/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * RegionsService - service
 */
angular
    .module('oss')
    .service('RegionsService', RegionsService);

function RegionsService($rootScope, $http, $q, API) {
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
