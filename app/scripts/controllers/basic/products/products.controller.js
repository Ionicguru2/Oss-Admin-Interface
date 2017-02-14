/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * BasicProductsCtrl - controller
 */
function ProductsCtrl($scope, $rootScope, $compile, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, API, $modal, ProductsService, STATUS) {

    $scope.dtInstance = {};
    $scope.products = {};
    var ajaxOptions = {
        dataSrc: function(json){
            console.log('products: ', json);
            angular.forEach( json , function ( obj, index ) {
                // console.log(index, obj);
                obj.displayName = obj.user.firstname + ' ' + obj.user.lastname;
                obj.edit = '<a ng-click="edit(' + obj.id + ')">EDIT</a>';
                obj.delete = '<a ng-click="delete(' + obj.id + ')">DELETE</a>';
                $scope.products[obj.id] = obj;
            });
            return json;
        },
        url: API.base + API.product_user.replace('{id}', $rootScope.loggedInUser.id),
        type: 'GET',
        data: {_rest_token: $rootScope.rest_token}
    };
    
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', ajaxOptions)
        .withPaginationType('full_numbers')
        .withOption('responsive', true)
        .withDOM('lfrtip')
        .withOption('createdRow', function(row) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        });

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('title').withTitle('TITLE'),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('category.name').withTitle('CATEGORY'),
        DTColumnBuilder.newColumn('displayName').withTitle('USER'),
        DTColumnBuilder.newColumn('type').withTitle('TYPE'),
        DTColumnBuilder.newColumn('price').withTitle('PRICE'),
        DTColumnBuilder.newColumn(null).withTitle('STATUS').renderWith(statusHTML),
        DTColumnBuilder.newColumn('edit').withTitle('').notSortable(),
        DTColumnBuilder.newColumn('delete').withTitle('').notSortable()
    ];

    function statusHTML(data, type, full, meta) {
        var html = data.status.name.toUpperCase();
        return html;
    }

    $scope.createProduct = function() {
        var modalInstance = $modal.open({
            controller: 'BasicCreateProductModalCtrl',
            templateUrl: 'views/basic/products/modal.product.create.html'
        });
        modalInstance.result.then(function(modalResult) {
            ProductsService.createProduct(modalResult)
            .then(function(response) {
                console.log('create success: ', response);
                $scope.dtInstance.reloadData(function(result) {
                    console.log('reload: ', result);
                }, true);
            }, function(error) {
                console.log('create error: ', error);
            });
        });
    };

    $scope.edit = function(id) {
        if ($scope.products[id].status.name.toLowerCase() == STATUS.PRODUCTION_STATUS_POSTED ||
            $scope.products[id].status.name.toLowerCase() == STATUS.PRODUCTION_STATUS_CREATED) {
            var modalInstance = $modal.open({
                controller: 'BasicEditProductModalCtrl',
                templateUrl: 'views/basic/products/modal.product.edit.html',
                resolve: {
                    userId: function() {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function(modalResult) {
                $scope.dtInstance.reloadData(function(result) {
                    console.log('reload: ', result);
                }, true);
            });
        } else {
            $modal.open({
                controller: 'BasicProductConfirmModalCtrl',
                templateUrl: 'views/basic/products/modal.alert.html'
            });
        }
    };

    $scope.delete = function(id) {
        var modalInstance = $modal.open({
            controller: 'BasicProductConfirmModalCtrl',
            templateUrl: 'views/basic/products/modal.delete.confirm.html'
        });
        modalInstance.result.then(function(modalResult) {
            ProductsService.deleteProduct(id)
            .then(function(response) {
                console.log('remove success: ', response);
                $scope.dtInstance.reloadData(function(result) {
                    console.log('reload: ', result);
                }, true);
            }, function(error) {
                console.log('remove error: ', error);
            });
        });
    };
};


angular
    .module('oss')
    .controller('BasicProductsCtrl', ProductsCtrl);