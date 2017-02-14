/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * PowerSettingsCtrl - controller
 */
function SettingsCtrl($scope, $rootScope, UsersService, CountriesService, RegionsService) {

    $scope.init = function() {
        console.log('user: ', $rootScope.loggedInUser);
        $scope.data = $rootScope.loggedInUser;
        /*CountriesService.getCountries()
        .then(function(response) {
            console.log('Countries: ', response);
        }, function(error) {
            console.log('Countries error: ', error);
        });*/
        RegionsService.getRegions()
        .then(function(response) {
            console.log('regions: ', response);
            $scope.regions = response.data;
        }, function(error) {
            console.log('error: ', error);
        });
    };

    $scope.validateForm = function() {
        if (!$scope.data.email || $scope.data.email.indexOf('@') < 0) {
            $scope.error = 'Please enter valid email.';
            return false;
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
        $scope.error = '';
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
    .controller('PowerSettingsCtrl', SettingsCtrl);