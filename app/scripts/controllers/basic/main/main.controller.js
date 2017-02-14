/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * BasicMainCtrl - controller
 */
function MainCtrl($rootScope, $scope, $state, UsersService, localStorageService) {

	$rootScope.loggedInUser = localStorageService.get('user');
	$rootScope.rest_token = $rootScope.loggedInUser.session.rest_token;

    $scope.logout = function() {
    	UsersService.logout()
    	.then(function(response) {
    		console.log(response);
    		$state.go('login');
    	});
    };
};


angular
    .module('oss')
    .controller('BasicMainCtrl', MainCtrl);