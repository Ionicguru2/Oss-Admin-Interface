/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * BasicCreateProductModalCtrl - controller
 */
function CreateProductModalCtrl($scope, $modalInstance, RegionsService) {

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
        // if (!$scope.data.region_id) {
        //     $scope.error = 'Please select region.';
        //     return false;
        // } else {
        //     $scope.data.region_id = $scope.data.region_id.id;
        // }
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
 * BasicEditProductModalCtrl - controller
 */
function EditProductModalCtrl($scope, $q, $modalInstance, ProductsService, userId, CategoriesService, CountriesService) {
    
    $scope.getData = function() {
        var promises = [
            ProductsService.getProduct(userId),
            CategoriesService.getCategories(),
            CountriesService.getCountries()
        ];
        $q.all(promises)
        .then(function(response) {
            console.log('result: ', response);
            $scope.data = response[0].data;
            $scope.categories = response[1].data;
            $scope.countries = response[2].data;
            $scope.setOptionValues();
        }, function(error) {
            console.log('fetch error: ', error);
        });
    };

    $scope.setOptionValues = function() {
        var i;
        for (i = 0; i < $scope.categories.length; i++) {
            if ($scope.data.category_id == $scope.categories[i].id) {
                $scope.data.category_id = $scope.categories[i];
                break;
            }
        }
        for (i = 0; i < $scope.countries.length; i++) {
            if ($scope.data.country_id == $scope.countries[i].id) {
                $scope.data.country_id = $scope.countries[i];
                break;
            }
        }
    };

    $scope.validateForm = function() {
        if (!$scope.data.category_id) {
            $scope.error = 'Please select category.';
            return false;
        } else {
            $scope.data.category_id = $scope.data.category_id.id;
        }
        if (!$scope.data.country_id) {
            $scope.error = 'Please select country.';
            return false;
        } else {
            $scope.data.country_id = $scope.data.country_id.id;
        }
        return true;
    };
    
    $scope.done = function() {
        if (!$scope.validateForm()) return;
        ProductsService.updateProduct($scope.data)
        .then(function(response) {
            $modalInstance.close('ok');
        }, function(error) {
            console.log('fetch error: ', error);
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.getData();
};

/**
 * BasicProductConfirmModalCtrl - controller
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
    .controller('BasicCreateProductModalCtrl', CreateProductModalCtrl)
    .controller('BasicEditProductModalCtrl', EditProductModalCtrl)
    .controller('BasicProductConfirmModalCtrl', ComfirmModalCtrl);