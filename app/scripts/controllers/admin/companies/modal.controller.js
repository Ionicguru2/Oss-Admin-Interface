/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * AdminCreateCompanyModalCtrl - controller
 */
function CreateCompanyModalCtrl($scope, $modalInstance, RegionsService) {

    $scope.data = {};

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
        if (!$scope.data.region_id) {
            $scope.error = 'Please select region.';
            return false;
        } else {
            $scope.data.region_id = $scope.data.region_id.id;
        }
        return true;
    };

    $scope.done = function() {
        if (!$scope.validateForm()) return;
    	$modalInstance.close($scope.data);
    };

    $scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
    };

    $scope.loadRegions();
};

/**
 * AdminEditCompanyModalCtrl - controller
 */
function EditCompanyModalCtrl($scope, $modalInstance, CompaniesService, userId, RegionsService) {
	
	$scope.getCompnayInfo = function() {
		CompaniesService.getCompany(userId)
		.then(function(response) {
            // console.log('fetched company: ', response);
            $scope.data = response.data;
        }, function(error) {
            console.log('fetch error: ', error);
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
        if (!$scope.data.region_id) {
            $scope.error = 'Please select region.';
            return false;
        } else {
            $scope.data.region_id = $scope.data.region_id.id;
        }
        return true;
    };
	
    $scope.done = function() {
        if (!$scope.validateForm()) return;
    	CompaniesService.updateCompany($scope.data)
		.then(function(response) {
            $modalInstance.close('ok');
        }, function(error) {
            console.log('fetch error: ', error);
        });
    };

    $scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
    };

    $scope.getCompnayInfo();
    $scope.loadRegions();
};

/**
 * AdminCompanyConfirmModalCtrl - controller
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
    .controller('AdminCreateCompanyModalCtrl', CreateCompanyModalCtrl)
    .controller('AdminEditCompanyModalCtrl', EditCompanyModalCtrl)
    .controller('AdminCompanyConfirmModalCtrl', ComfirmModalCtrl);