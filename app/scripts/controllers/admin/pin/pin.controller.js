/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * AdminPinCtrl - controller
 */
function PinCtrl($scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, AdminUserService, AuthService, API) {

    $scope.dtInstance = {};
    // var token = '8f04c9530a4b214e5d237d60bd5fc5e8';
    var ajaxOptions = {
        dataSrc: function(json){
            angular.forEach( json , function ( obj, index ) {
                // console.log(index, obj);
                obj.fullname = obj.firstname + ' ' + obj.lastname;
                obj.changePin = '<button class="btn btn-success" ng-click="changePin()" style="padding: 0px 20px;">CHANGE PIN</button>'
            });
            return json;
        },
        url: API.base,
        type: 'GET',
        // data: {_rest_token: token}
        data: {_rest_token: $rootScope.rest_token}
    };
    
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', ajaxOptions)
        .withPaginationType('full_numbers')
        .withOption('responsive', true)
        .withDOM('lfrtip');
        // .withTableToolsButtons([
        //     'Remove'
        // ]);

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('changePin').withTitle('PIN RESET').notSortable(),
        DTColumnBuilder.newColumn('id').withTitle('USER ID'),
        DTColumnBuilder.newColumn('fullname').withTitle('Name'),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('email').withTitle('EMAIL ADDRESS'),
        DTColumnBuilder.newColumn('email').withTitle('TELEPHONE NUMBER'),
        DTColumnBuilder.newColumn('email').withTitle('COMPANY'),
        DTColumnBuilder.newColumn('email').withTitle('JOB'),
        DTColumnBuilder.newColumn('email').withTitle('COUNTRY'),
    ];
};


angular
    .module('oss')
    .controller('AdminPinCtrl', PinCtrl);