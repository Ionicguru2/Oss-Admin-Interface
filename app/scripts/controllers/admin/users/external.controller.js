/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * AdminExternalUserCtrl - controller
 */
function ExternalUserCtrl($scope, $rootScope, $compile, $modal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, UsersService, API) {

    $scope.dtInstance = {};
    // var token = '8f04c9530a4b214e5d237d60bd5fc5e8';
    var ajaxOptions = {
        dataSrc: function(json){
            console.log('users: ', json);
            var userList = [];
            angular.forEach( json , function ( obj, index ) {
                if (obj.role.identifier === 'basic') {
                    obj.fullname = obj.firstname + ' ' + obj.lastname;
                    obj.edit = '<a onclick="angular.element(this).scope().editUser(' + obj.id + ')">EDIT</a>';
                    obj.delete = '<a onclick="angular.element(this).scope().deleteUser(' + obj.id + ')">DELETE</a>';
                    userList.push(obj);
                }
            });
            return userList;
        },
        url: API.base + API.user_all,
        type: 'GET',
        // params: {_rest_token: token}
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
        DTColumnBuilder.newColumn('identifier').withTitle('USER ID'),
        DTColumnBuilder.newColumn(null).withTitle('Name').renderWith(userHtml),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('email').withTitle('EMAIL ADDRESS'),
        DTColumnBuilder.newColumn('phone').withTitle('TELEPHONE NUMBER'),
        DTColumnBuilder.newColumn('company.name').withTitle('COMPANY'),
        DTColumnBuilder.newColumn('job').withTitle('JOB'),
        DTColumnBuilder.newColumn(null).withTitle('COUNTRY'),
        DTColumnBuilder.newColumn('edit').withTitle('').notSortable(),
        DTColumnBuilder.newColumn('delete').withTitle('').notSortable()
    ];

    function userHtml(data, type, full, meta) {
        return '<a ng-click="showUserInfo(' + data.id + ')">' + data.fullname + '</a>';
    }

    $scope.showUserInfo = function(id) {
        var modalInstance = $modal.open({
            controller: 'AdminEditExternalUserModalCtrl',
            templateUrl: 'views/admin/users/modal.external.info.html',
            resolve: {
                userId: function() {
                    return id;
                }
            }
        });
    };

    $scope.editUser = function(id) {
        var modalInstance = $modal.open({
            controller: 'AdminEditExternalUserModalCtrl',
            templateUrl: 'views/admin/users/modal.external.edit.html',
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

    $scope.deleteUser = function(id) {
        var modalInstance = $modal.open({
            controller: 'AdminConfirmModalCtrl',
            templateUrl: 'views/admin/users/modal.delete.html'
        });
        modalInstance.result.then(function(modalResult) {
            UsersService.remove(id)
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
    .controller('AdminExternalUserCtrl', ExternalUserCtrl);