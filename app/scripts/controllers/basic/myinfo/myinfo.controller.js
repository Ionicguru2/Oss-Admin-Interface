/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * BasicSettingsCtrl - controller
 */
function SettingsCtrl($scope, $rootScope, UsersService, RegionsService, CompaniesService) {

	$scope.init = function() {
        console.log('user: ', $rootScope.loggedInUser);
    	$scope.data = $rootScope.loggedInUser;
        $scope.loadRegions();
        $scope.loadCompanies();
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

    $scope.loadCompanies = function() {
        CompaniesService.getCompanies()
        .then(function(response) {
            console.log('companies: ', response);
            $scope.companies = response;
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
            console.log('edited: ', response);
            $rootScope.loggedInUser = response;
        }, function(error) {
            console.log('fetch error: ', error);
        });
    };

    $scope.init();
};


angular
    .module('oss')
    .controller('BasicSettingsCtrl', SettingsCtrl);