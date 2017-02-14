/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * PowerUserModalCtrl - controller
 */
function UserModalCtrl($scope, $modalInstance, userId, UsersService, CompaniesService, RegionsService) {

    $scope.getUserInfo = function() {
		UsersService.getUserInfo(userId)
		.then(function(response) {
            console.log('fetched user: ', response);
            $scope.data = response;
        }, function(error) {
            console.log('fetch error: ', error);
        });
	};

    $scope.loadCompanies = function() {
        CompaniesService.getCompanies()
        .then(function(response) {
            console.log('companies: ', response);
            $scope.companies = response;
        }, function(error) {
            console.log('error: ', error);
        });
    };

    $scope.loadRegions = function() {
        RegionsService.getRegions()
        .then(function(response) {
            console.log('regions: ', response);
            $scope.regions = response.data;
        }, function(error) {
            console.log('error: ', error);
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

	$scope.showEdit = function() {
		$scope.editMode = true;
	};
    
    $scope.cancelEdit = function() {
    	$scope.editMode = false;
    };

    $scope.editInfo = function() {
        if (!$scope.validateForm()) return;
    	$scope.editMode = false;
    	UsersService.updateUserInfo($scope.data)
		.then(function(response) {
            // $modalInstance.close('ok');
            $scope.data = response;	
        }, function(error) {
            console.log('fetch error: ', error);
        });
    };

    $scope.closeModal = function() {
    	$modalInstance.close('ok');
    };

    $scope.getUserInfo();
    $scope.loadCompanies();
    $scope.loadRegions();
};

/**
 * PowerConfirmModalCtrl - controller
 */
function ComfirmModalCtrl($scope, $modalInstance) {
    $scope.done = function() {
        $modalInstance.close('ok');
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};

angular
    .module('oss')
    .controller('PowerUserModalCtrl', UserModalCtrl)
    .controller('PowerConfirmModalCtrl', ComfirmModalCtrl);