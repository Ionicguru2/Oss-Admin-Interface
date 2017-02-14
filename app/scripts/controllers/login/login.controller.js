/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * LoginCtrl - controller
 */
function LoginCtrl($scope, $rootScope, $state, $location, UsersService, localStorageService, UserRole) {

	$scope.data = {
		email: '',
		password: ''
	};

	$scope.doLogin = function() {
		UsersService.login({
			email: $scope.data.email,
			password: $scope.data.password
		})
		.then(function(response) {
			console.log('login success: ', response);
			localStorageService.set('user', response);
			if (response.message) {
				$scope.error = response.message;
			} else {
				if (response.role.identifier === UserRole.BASIC) {
					$state.go('basic.my-info');
				} else if (response.role.identifier === UserRole.CSR) {
					$state.go('csr.external-user');
				} else if (response.role.identifier === UserRole.POWER) {
					$state.go('power.members');
				} else if (response.role.identifier === UserRole.ADMIN) {
					$state.go('admin.internal-user');
				}
				// $state.go('admin.internal-user');
			}			
		}, function(error) {
			console.log('login error: ', error);
			// $state.go('admin.internal-user');
			$scope.error = error.message;
		});
	};
};


angular
    .module('oss')
    .controller('LoginCtrl', LoginCtrl);