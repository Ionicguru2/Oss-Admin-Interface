/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * CSRExternalUserModalCtrl - controller
 */
function ExternalUserModalCtrl($scope, $modalInstance, userId, UsersService) {

	$scope.getUserInfo = function() {
		UsersService.getUserInfo(userId)
		.then(function(response) {
            console.log('fetched user: ', response);
            $scope.data = response;
        }, function(error) {
            console.log('fetch error: ', error);
        });
	};

    $scope.validateForm = function() {
        if (!$scope.data.company_id) {
            $scope.error = 'Please select company.';
            return false;
        } else {
            $scope.data.company_id = $scope.data.company_id.id;
        }
        if (!$scope.data.region_id) {
            $scope.error = 'Please select region.';
            return false;
        } else {
            $scope.data.region_id = $scope.data.region_id.id;
        }
        return true;
    };

    $scope.done = function() {
    	$modalInstance.close($scope.data);
    };

    $scope.closeModal = function() {
    	$modalInstance.dismiss('cancel');
    };

    $scope.getUserInfo();

};

/**
 * CSRChangePasswordModalCtrl - controller
 */
function ChangePasswordModalCtrl($scope, $modalInstance, UsersService, userId) {

	$scope.getUserInfo = function() {
		UsersService.getUserInfo(userId)
		.then(function(response) {
            console.log('fetched user: ', response);
            $scope.data = response;
        }, function(error) {
            console.log('fetch error: ', error);
        });
	};

    $scope.edit = function() {
    	UsersService.updateUserInfo($scope.data)
    	.then(function(response) {
    		console.log('successfully changed password: ', response);
    		$modalInstance.close($scope.data);
    	}, function(error) {
    		console.log('fetch error: ', error);
    	});    	
    };

    $scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
    };
    
    $scope.getUserInfo();
};

angular
    .module('oss')
    .controller('CSRExternalUserModalCtrl', ExternalUserModalCtrl)
    .controller('CSRChangePasswordModalCtrl', ChangePasswordModalCtrl);