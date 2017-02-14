/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * BasicTransactionsConfirmModalCtrl - controller
 */
function ConfirmModalCtrl($scope, $modalInstance) {
    $scope.done = function() {
    	$modalInstance.close('ok');
    };

    $scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
    };
};


angular
    .module('oss')
    .controller('BasicTransactionsConfirmModalCtrl', ConfirmModalCtrl);
