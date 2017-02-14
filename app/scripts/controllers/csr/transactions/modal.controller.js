/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * CSRTransactionsConfirmModalCtrl - controller
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
    .controller('CSRTransactionsConfirmModalCtrl', ComfirmModalCtrl);
