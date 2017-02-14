/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * CSRExternalUserCtrl - controller
 */
function ExternalUserCtrl($scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, UsersService, API, $modal, $compile) {

    $scope.dtInstance = {};
    // var token = '8f04c9530a4b214e5d237d60bd5fc5e8';
    var ajaxOptions = {
        dataSrc: function(json){
            console.log('users: ', json);
            var userList = [];
            angular.forEach( json , function ( obj, index ) {
                if ((obj.role.identifier === 'basic') ||
                    (obj.role.identifier === 'power')) {
                    obj.fullname = obj.firstname + ' ' + obj.lastname;
                    obj.changePassword = '<a onclick="angular.element(this).scope().changePassword(' + obj.id + ')">CHANGE PASSWORD</a>';
                    obj.requestReset = '<a class="link-disabled" onclick="angular.element(this).scope().requestPasscodeRest(' + obj.id + ')">REQUEST PASSCODE RESET</a>';
                    obj.submitTicket = '<a class="link-disabled" onclick="angular.element(this).scope().submit(' + obj.id + ')">SUBMIT USER TICKET</a>';
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
        // .withTableToolsButtons([
        //     'Remove'
        // ]);

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('identifier').withTitle('USER ID'),
        DTColumnBuilder.newColumn(null).withTitle('Name').renderWith(userHtml),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('company.name').withTitle('COMPANY'),
        DTColumnBuilder.newColumn(null).withTitle('USER LEVEL')
        .renderWith(function(data, type, full, meta) {
                return data.role.identifier.toUpperCase() + ' USER';
        }),
        DTColumnBuilder.newColumn('changePassword').withTitle('').notSortable(),
        DTColumnBuilder.newColumn('requestReset').withTitle('').notSortable(),
        DTColumnBuilder.newColumn('submitTicket').withTitle('').notSortable()
    ];

    function userHtml(data, type, full, meta) {
        return '<a ng-click="showUserInfo(' + data.id + ')">' + data.fullname + '</a>';
    }

    $scope.changePassword = function(id) {
        var modalInstance = $modal.open({
            controller: 'CSRChangePasswordModalCtrl',
            templateUrl: 'views/csr/users/modal.reset.password.html',
            resolve: {
                userId: function() {
                    return id;
                }
            }
        });
    };

    $scope.requestPasscodeRest = function(id) {
        
    };

    $scope.submit = function(id) {
        
    };

    $scope.showUserInfo = function(id) {
        var modalInstance = $modal.open({
            controller: 'CSRExternalUserModalCtrl',
            templateUrl: 'views/csr/users/modal.external.info.html',
            resolve: {
                userId: function() {
                    return id;
                }
            }
        });
    };
};


angular
    .module('oss')
    .controller('CSRExternalUserCtrl', ExternalUserCtrl);
    