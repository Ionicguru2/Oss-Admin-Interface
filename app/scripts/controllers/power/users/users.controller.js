/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * PowerUserCtrl - controller
 */
function UserCtrl($scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, API, $modal, $compile, UsersService) {

    $scope.dtInstance = {};
    $scope.userRole = [];
    console.log('current user: ', $rootScope.loggedInUser);

    var ajaxOptions = {
        dataSrc: function(json){
            console.log('members: ', json);
            var userList = [];
            var iterator = 0;
            angular.forEach( json , function ( obj, index ) {
                if ((obj.role.identifier === 'basic') ||
                    (obj.role.identifier === 'power')) {
                    // console.log(iterator, obj);
                    obj.fullname = obj.firstname + ' ' + obj.lastname;
                    $scope.userRole[iterator] = obj.role.identifier;
                    obj.index = iterator;
                    obj.chk = '<input type="checkbox" id="chk' + index + '">';
                    obj.fullname = obj.firstname + ' ' + obj.lastname;
                    obj.chk_power = '<input type="radio" name="userrole' + index + '" id="chk_power' + index + '" value="power">';
                    obj.chk_basic = '<input type="radio" name="userrole' + index + '" id="chk_basic' + index + '" value="basic">';
                    obj.edit = '<a onclick="angular.element(this).scope().editUser(' + obj.id + ')">EDIT</a>';
                    // obj.suspend = '<a onclick="angular.element(this).scope().suspendUser(' + obj.id + ')">SUSPEND</a>';
                    obj.delete = '<a onclick="angular.element(this).scope().deleteUser(' + obj.id + ')">DELETE</a>';
                    userList.push(obj);
                    iterator ++;
                }
            });
            return userList;
        },
        url: API.base + API.company_users.replace('{id}', $rootScope.loggedInUser.company_id),
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
        // .withTableToolsButtons([
        //     'Remove'
        // ]);

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('chk').withTitle('<input type="checkbox" id="chk">').notSortable(),
        DTColumnBuilder.newColumn('id').withTitle('USER ID'),
        DTColumnBuilder.newColumn('fullname').withTitle('Name'),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('email').withTitle('EMAIL ADDRESS'),
        DTColumnBuilder.newColumn(null).withTitle('POWER USER').notSortable().renderWith(chkPowerHtml),
        DTColumnBuilder.newColumn(null).withTitle('BASIC USER').notSortable().renderWith(chkBasicHtml),
        DTColumnBuilder.newColumn('edit').withTitle('').notSortable(),
        DTColumnBuilder.newColumn('delete').withTitle('').notSortable()
    ];

    function chkBasicHtml(data, type, full, meta) {
        return '<input type="radio" ng-model="userRole[' + data.index + ']" name="userrole' + data.index + '" id="chk_basic' + data.index + '" value="basic" disabled>';
    }

    function chkPowerHtml(data, type, full, meta) {
        // console.log('params: ', data);
        return '<input type="radio" ng-model="userRole[' + data.index + ']" name="userrole' + data.index + '" id="chk_exe' + data.index + '" value="power" disabled>';
    }

    $scope.suspendUser = function() {
        var modalInstance = $modal.open({
            controller: 'PowerConfirmModalCtrl',
            templateUrl: 'views/power/users/modal.suspend.html'
        });
        modalInstance.result.then(function(modalResult) {
            UsersService.suspendUser(id)
            .then(function(response) {
                console.log('suspend success: ', response);
                $scope.dtInstance.reloadData(function(result) {
                    console.log('reload: ', result);
                }, true);
            }, function(error) {
                console.log('suspend error: ', error);
            });
        });
    };

    $scope.editUser = function(id) {
        var modalInstance = $modal.open({
            controller: 'PowerUserModalCtrl',
            templateUrl: 'views/power/users/modal.user.info.html',
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
            controller: 'PowerConfirmModalCtrl',
            templateUrl: 'views/power/users/modal.delete.html'
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
    .controller('PowerUserCtrl', UserCtrl);