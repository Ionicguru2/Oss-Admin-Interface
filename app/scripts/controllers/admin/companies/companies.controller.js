/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * AdminCompaniesCtrl - controller
 */
function CompaniesCtrl($scope, $rootScope, $compile, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, API, $modal, CompaniesService) {

    $scope.dtInstance = {};
    // var token = '8f04c9530a4b214e5d237d60bd5fc5e8';
    var ajaxOptions = {
        dataSrc: function(json){
            console.log('companies: ', json);
            angular.forEach( json , function ( obj, index ) {
                // console.log(index, obj);
                obj.edit = '<a ng-click="edit(' + obj.id + ')">EDIT</a>';
                obj.delete = '<a ng-click="delete(' + obj.id + ')">DELETE</a>';
            });
            return json;
        },
        url: API.base + API.company_all,
        type: 'GET',
        // data: {_rest_token: token}
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
        DTColumnBuilder.newColumn('name').withTitle('COMPANY NAME'),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('user_count').withTitle('MEMBERS'),
        DTColumnBuilder.newColumn('transaction_count').withTitle('TRANSACTIONS'),
        DTColumnBuilder.newColumn('region.name').withTitle('REGION'),
        DTColumnBuilder.newColumn('edit').withTitle('').notSortable(),
        DTColumnBuilder.newColumn('delete').withTitle('').notSortable()
    ];

    $scope.createCompany = function() {
        var modalInstance = $modal.open({
            controller: 'AdminCreateCompanyModalCtrl',
            templateUrl: 'views/admin/companies/modal.company.create.html'
        });
        modalInstance.result.then(function(modalResult) {
            CompaniesService.createCompany(modalResult)
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
        var modalInstance = $modal.open({
            controller: 'AdminEditCompanyModalCtrl',
            templateUrl: 'views/admin/companies/modal.company.edit.html',
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
    };

    $scope.delete = function(id) {
        var modalInstance = $modal.open({
            controller: 'AdminCompanyConfirmModalCtrl',
            templateUrl: 'views/admin/companies/modal.delete.confirm.html'
        });
        modalInstance.result.then(function(modalResult) {
            CompaniesService.deleteCompany(id)
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
    .controller('AdminCompaniesCtrl', CompaniesCtrl);