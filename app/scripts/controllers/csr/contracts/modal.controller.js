/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * CSRCreateContractModalCtrl - controller
 */
function CreateContractModalCtrl($scope, $modalInstance, folderId) {

    $scope.data = {
        type: 'FOLDER',
        parent_id: folderId
    };

    $scope.validateForm = function() {
        if ($scope.data.type === 'DOCUMENT' && !$scope.data.document) {
            $scope.error = 'You should upload document.';
            return false;
        }
        return true;
    };

    $scope.done = function() {
        if (!$scope.validateForm()) return;
    	$modalInstance.close($scope.data);
    };

    $scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
    };

    $scope.getFile = function(file, invalidFile) {
        $scope.file = file;
        // console.log($scope.document.file);
        // console.log('file: ', file);
        if (!file && invalidFile) {
            $scope.fileError = 'You can upload only files with format *.pdf.';
        } else {
            $scope.fileError = '';
        }
    };

};

/**
 * CSREditContractModalCtrl - controller
 */
function EditContractModalCtrl($scope, $modalInstance, type, id) {

    $scope.data = {
        type: type
    };

    $scope.validateForm = function() {
        if ($scope.data.type === 'DOCUMENT' && !$scope.data.document) {
            $scope.error = 'You should upload document.';
            return false;
        }
        return true;
    };

    $scope.done = function() {
        if (!$scope.validateForm()) return;
        $modalInstance.close($scope.data);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.getFile = function(file, invalidFile) {
        $scope.file = file;
        // console.log($scope.document.file);
        // console.log('file: ', file);
        if (!file && invalidFile) {
            $scope.fileError = 'You can upload only files with format *.pdf.';
        } else {
            $scope.fileError = '';
        }
    };

};

/**
 * CSRContractUploadModalCtrl - controller
 */
function UploadModalCtrl($scope, $modalInstance) {

    $scope.done = function() {
    	$modalInstance.close($scope.data);
    };

    $scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
    };

};

/**
 * CSRContractDeleteConfirmModalCtrl - controller
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
    .controller('CSRCreateContractModalCtrl', CreateContractModalCtrl)
    .controller('CSREditContractModalCtrl', EditContractModalCtrl)
    .controller('CSRContractUploadModalCtrl', UploadModalCtrl)
    .controller('CSRContractDeleteConfirmModalCtrl', ComfirmModalCtrl);