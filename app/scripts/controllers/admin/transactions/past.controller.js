/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * AdminPastTransactionCtrl - controller
 */
function PastTransactionCtrl($scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, API, $modal, $compile, STATUS, TransactionsService) {

    $scope.dtInstance = {};
    // var token = '8f04c9530a4b214e5d237d60bd5fc5e8';
    var ajaxOptions = {
        dataSrc: function(json) {
            console.log('transactions: ', json);
            var transactions = [];
            if (json.error !== 200) {
                angular.forEach( json , function ( obj, index ) {
                    // console.log(index, obj);
                    obj.merchant = obj.customer = '';
                    if (obj.product &&
                        obj.transaction_stage && (!obj.enable || 
                        obj.transaction_stage.identifier === STATUS.TRANSACTION_STATUS_EXPIRED)) {
                        angular.forEach(obj.users, function(user) {
                            if (obj.product.user_id === user.id) {
                                obj.merchant = user.identifier;
                            } else {
                                obj.customer = user.identifier;
                            }
                        });
                        transactions.push(obj);
                    }
                });
            }
            return transactions;
        },
        url: API.base + API.transaction_all,
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
        DTColumnBuilder.newColumn('id').withTitle('TRANSACTION ID'),
        DTColumnBuilder.newColumn('merchant').withTitle('MERCHANT'),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('customer').withTitle('CUSTOMER'),
        DTColumnBuilder.newColumn('product.available_from').withTitle('START DATE'),
        DTColumnBuilder.newColumn('product.available_to').withTitle('END DATE'),
        DTColumnBuilder.newColumn(null).withTitle('STAGE').renderWith(statusHtml).notSortable(),
        DTColumnBuilder.newColumn(null).withTitle('').renderWith(approveHtml).notSortable(),
        DTColumnBuilder.newColumn(null).withTitle('').renderWith(denyHtml).notSortable(),
    ];

    function statusHtml(data, type, full, meta) {
        var html = '';
        if (data.transaction_stage) {
            html = '<span>' + data.transaction_stage.name + '</span>';
        }
        return html;
    }

    function approveHtml(data, type, full, meta) {
        var html = '';
        if (data.transaction_stage) {
            if (data.transaction_stage.identifier === STATUS.PENDING_APPROVAL_STATUS) {
                html = '<a ng-click="approveTransaction(' + data.id + ')">Approve</a>';
            }
        }        
        return html;
    }

    function denyHtml(data, type, full, meta) {
        var html = '';
        if (data.transaction_stage) {
            if (data.transaction_stage.identifier === STATUS.PENDING_APPROVAL_STATUS) {
                html = '<a ng-click="denyTransaction(' + data.id + ')">Deny</a>';
            }
        }
        return html;
    }

    $scope.approveTransaction = function(transaction_id) {
        var modalInstance = $modal.open({
            controller: 'AdminTransactionsConfirmModalCtrl',
            templateUrl: 'views/admin/transactions/modal.confirm.approve.html'
        });
        modalInstance.result.then(function(modalResult) {
            TransactionsService.approveTransaction(transaction_id)
            .then(function(response) {
                console.log('approve success: ', response);
                $scope.dtInstance.reloadData(function(result) {
                    console.log('reload: ', result);
                }, true);
            }, function(error) {
                console.log('approve error: ', error);
            });
        });
    };

    $scope.denyTransaction = function(transaction_id) {
        var modalInstance = $modal.open({
            controller: 'AdminTransactionsConfirmModalCtrl',
            templateUrl: 'views/admin/transactions/modal.confirm.deny.html'
        });
        modalInstance.result.then(function(modalResult) {
            TransactionsService.denyTransaction(transaction_id)
            .then(function(response) {
                console.log('deny success: ', response);
                $scope.dtInstance.reloadData(function(result) {
                    console.log('reload: ', result);
                }, true);
            }, function(error) {
                console.log('deny error: ', error);
            });
        });
    };
};


angular
    .module('oss')
    .controller('AdminPastTransactionCtrl', PastTransactionCtrl);