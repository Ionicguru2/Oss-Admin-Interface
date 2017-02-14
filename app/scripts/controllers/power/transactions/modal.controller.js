/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * PowerTransactionsConfirmModalCtrl - controller
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
    .controller('PowerTransactionsConfirmModalCtrl', ComfirmModalCtrl);
