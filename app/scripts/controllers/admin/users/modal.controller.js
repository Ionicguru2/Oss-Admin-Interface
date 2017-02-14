/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * AdminInternalUserModalCtrl - controller
 */
function CreateInternalUserModalCtrl($scope, $modalInstance, CompaniesService, UsersService, CountriesService) {

    $scope.data = {
        role_id: 2
    };

    $scope.companies1 = [{id: 1, name: 'asdf'}, {id: 2, name: 'qwer'}];

    $scope.validateForm = function() {
        if (!$scope.data.country_id) {
            $scope.error = 'Please select country.';
            return false;
        } else {
            $scope.data.country_id = $scope.data.country_id.id;
        }
        if (!$scope.data.company_id) {
            $scope.error = 'Please select company.';
            return false;
        } else {
            $scope.data.company_id = $scope.data.company_id.id;
        }
        return true;
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

    $scope.loadCountries = function() {
        CountriesService.getCountries()
        .then(function(response) {
            console.log('countries: ', response);
            $scope.countries = response.data;
        }, function(error) {
            console.log('error: ', error);
        });
    };

    $scope.done = function() {
        console.log('submit');
        if (!$scope.validateForm()) return;
        UsersService.create($scope.data)
        .then(function(response) {
            console.log('create success: ', response);
            if (response.message) {
                $scope.error = response.message;
            } else {
                $modalInstance.close('ok');
            }
        }, function(error) {
            console.log('create error: ', error);
            $scope.error = error.message;
        });
    	
    };

    $scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
    };

    $scope.loadCompanies();
    $scope.loadCountries();
};

/**
 * AdminEditInternalUserModalCtrl - controller
 */
function EditInternalUserModalCtrl($scope, $modalInstance, UsersService, userId) {
	
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
        
        return true;
    };
	
    $scope.done = function() {
    	UsersService.updateUserInfo($scope.data)
		.then(function(response) {
            if (response.message) {
                $scope.error = response.message;
            } else {
                $modalInstance.close('ok');
            }
        }, function(error) {
            console.log('fetch error: ', error);
            $scope.error = error.message;
        });
    };

    $scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
    };

    $scope.getUserInfo();
};

/**
 * AdminEditExternalUserModalCtrl - controller
 */
function EditExternalUserModalCtrl($scope, $modalInstance, UsersService, userId, CompaniesService) {
	
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

    $scope.loadRegions = function() {
        UsersService.getRegions()
        .then(function(response) {
            console.log('regions: ', response);
            $scope.regions = response.data;
        }, function(error) {
            console.log('error: ', error);
        });
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
            if (response.message) {
                $scope.error = response.message;
            } else {
                $modalInstance.close('ok');
            }
        }, function(error) {
            console.log('fetch error: ', error);
            $scope.error = error.message;
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
 * AdminConfirmModalCtrl - controller
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
    .controller('AdminInternalUserModalCtrl', CreateInternalUserModalCtrl)
    .controller('AdminEditInternalUserModalCtrl', EditInternalUserModalCtrl)
    .controller('AdminEditExternalUserModalCtrl', EditExternalUserModalCtrl)
    .controller('AdminConfirmModalCtrl', ComfirmModalCtrl);
