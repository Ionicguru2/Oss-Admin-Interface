/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * AdminCreateContractModalCtrl - controller
 */
function CreateContractModalCtrl($scope, $modalInstance, folderId, ContractsService) {

    $scope.data = {
        type: 'FOLDER',
        parent_id: folderId
    };

    $scope.validateForm = function() {
        if ($scope.data.type === 'DOCUMENT' && !$scope.data.document) {
            $scope.error = 'Please upload document.';
            return false;
        }
        if ($scope.data.type === 'FOLDER' && !$scope.data.name) {
            $scope.error = 'Please input folder name.';
            return false;
        }
        if (!$scope.data.parent_id)
            $scope.data.parent_id = folderId;
        return true;
    };

    $scope.done = function() {
        if (!$scope.validateForm()) return;
        ContractsService.createContract($scope.data)
        .then(function(response) {
            console.log('create success: ', response);
            if (response.data && response.data.message) {
                $scope.error = response.data.message;
            } else {
                $modalInstance.close('ok');
            }
        }, function(error) {
            console.log('create error: ', error);
            $scope.error = error.data.message;
        });
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
 * AdminEditContractModalCtrl - controller
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
 * AdminContractDeleteConfirmModalCtrl - controller
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
    .controller('AdminCreateContractModalCtrl', CreateContractModalCtrl)
    .controller('AdminEditContractModalCtrl', EditContractModalCtrl)
    .controller('AdminContractDeleteConfirmModalCtrl', ComfirmModalCtrl);