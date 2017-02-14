/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * AdminInternalUserCtrl - controller
 */
function InternalUserCtrl($scope, $rootScope, $compile, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, UsersService, API, $modal) {

    $scope.dtInstance = {};
    $scope.userRole = [];
    // var token = '8f04c9530a4b214e5d237d60bd5fc5e8';
    console.log('current user: ', $rootScope.loggedInUser);
    var ajaxOptions = {
        dataSrc: function(json){
            // console.log('users: ', json);
            var userList = [];
            var iterator = 0;
            angular.forEach( json , function ( obj, index ) {
                if ((obj.role.identifier === 'admin') ||
                    (obj.role.identifier === 'csr') ||
                    (obj.role.identifier === 'power')) {
                    // console.log(iterator, obj);
                    obj.fullname = obj.firstname + ' ' + obj.lastname;
                    $scope.userRole[iterator] = obj.role.identifier;
                    obj.index = iterator;
                    obj.edit = '<a onclick="angular.element(this).scope().editUser(' + obj.id + ')">EDIT</a>';
                    obj.delete = '<a onclick="angular.element(this).scope().deleteUser(' + obj.id + ')">DELETE</a>';
                    userList.push(obj);
                    iterator++;
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
        // .withTableToolsButtons([
        //     'Remove'
        // ]);

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('identifier').withTitle('USER ID'),
        DTColumnBuilder.newColumn('fullname').withTitle('Name'),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('email').withTitle('EMAIL ADDRESS'),
        // DTColumnBuilder.newColumn('chk_csr').withTitle('CSR').notSortable(),
        DTColumnBuilder.newColumn(null).withTitle('CSR').notSortable().renderWith(chkCSRHtml),
        DTColumnBuilder.newColumn(null).withTitle('ACCOUNT EXECUT').notSortable().renderWith(chkExeHtml),
        DTColumnBuilder.newColumn(null).withTitle('ADMIN').notSortable().renderWith(chkAdminHtml),
        DTColumnBuilder.newColumn('edit').withTitle('').notSortable(),
        DTColumnBuilder.newColumn('delete').withTitle('').notSortable()
    ];

    function chkCSRHtml(data, type, full, meta) {
        return '<input type="radio" ng-click="roleChanged()" ng-model="userRole[' + data.index + ']" name="userrole' + data.index + '" id="chk_csr' + data.index + '" value="csr" disabled>';
    }

    function chkAdminHtml(data, type, full, meta) {
        return '<input type="radio" ng-model="userRole[' + data.index + ']" name="userrole' + data.index + '" id="chk_admin' + data.index + '" value="admin" disabled>';
    }

    function chkExeHtml(data, type, full, meta) {
        // console.log('params: ', data);
        return '<input type="radio" ng-model="userRole[' + data.index + ']" name="userrole' + data.index + '" id="chk_exe' + data.index + '" value="power" disabled>';
    }

    $scope.createNewUser = function() {
        var modalInstance = $modal.open({
            controller: 'AdminInternalUserModalCtrl',
            templateUrl: 'views/admin/users/modal.internal.create.html'
        });
        modalInstance.result.then(function(modalResult) {
            console.log(modalResult);
            // UsersService.create(modalResult)
            // .then(function(response) {
            //     console.log('create success: ', response);
                $scope.dtInstance.reloadData(function(result) {
                    console.log('reload: ', result);
                }, true);
            // }, function(error) {
            //     console.log('create error: ', error);
            // });
        });
    };

    $scope.editUser = function(id) {
        var modalInstance = $modal.open({
            controller: 'AdminEditInternalUserModalCtrl',
            templateUrl: 'views/admin/users/modal.internal.edit.html',
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

    $scope.roleChanged = function() {
        console.log('role clicked');
    };
};


angular
    .module('oss')
    .controller('AdminInternalUserCtrl', InternalUserCtrl);