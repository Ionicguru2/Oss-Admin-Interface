/**
 * oss - Responsive Admin Panel
 *
 */

/**
 * CSRContractsCtrl - controller
 */
function ContractsCtrl($scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, API, $modal, $compile, ContractsService) {

    $scope.dtInstance = {};
    $scope.currentFolder = '';

    $scope.openFolder = function(folder_id) {
        var endpoint = API.base;
        if (folder_id && folder_id !== 3) {
            endpoint += API.contracts_for_folder + folder_id;
        } else {
            // endpoint += API.contract_company.replace('{id}', $rootScope.loggedInUser.company_id);
            endpoint += API.contracts;
        }

        ajaxOptions = {
            dataSrc: function(json) {
                console.log('contracts: ', json);
                $scope.currentFolder = json;
                var contracts = [];
                if (json.name !== 'ROOT') {
                    contracts.push({
                        contract_type: {
                            name: ''
                        },
                        size: '',
                        updated_at: '',
                        edit: '',
                        delete: ''
                    });
                }
                angular.forEach( json.children , function ( obj, index ) {
                    obj.edit = '<a class="link-disabled" onclick="angular.element(this).scope().edit(\'' + obj.contract_type.name + '\', ' + obj.id + ')">EDIT</a>';
                    obj.delete = '<a onclick="angular.element(this).scope().delete(' + obj.id + ')">DELETE</a>';
                    contracts.push(obj);
                });
                $scope.$digest();
                return contracts;
            },
            url: endpoint,
            type: 'GET',
            data: {_rest_token: $rootScope.rest_token}
        };
        $scope.configureTable();
    };

    $scope.configureTable = function() {
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
            // DTColumnBuilder.newColumn('chk').withTitle('<input type="checkbox" id="chk">'),
            DTColumnBuilder.newColumn(null).withTitle('NAME').renderWith(nameHtml),
            DTColumnBuilder.newColumn('contract_type.name').withTitle('TYPE'),
            // .notVisible() does not work in this case. Use .withClass('none') instead
            DTColumnBuilder.newColumn('size').withTitle('SIZE'),
            DTColumnBuilder.newColumn('updated_at').withTitle('LAST MODIFIED').notSortable(),
            DTColumnBuilder.newColumn('edit').withTitle('').notSortable(),
            DTColumnBuilder.newColumn('delete').withTitle('').notSortable()
        ];
    };

    function nameHtml(data, type, full, meta) {
        var html = data.name;
        if (data.contract_type.name === 'FOLDER') {
            html = '<i class="fa fa-folder"></i>&nbsp;' + 
                '<a ng-click="openFolder(' + data.id + ')">' + html + '</a>';
        } else if (data.contract_type.name === '') {
            html = '<i class="fa fa-arrow-left"></i>&nbsp;' + 
                '<a ng-click="openFolder(' + $scope.currentFolder.parent_id + ')">..</a>';
        } else {
            html = '<i class="fa fa-file"></i>&nbsp;' + html;
        }
        return html;
    }

    $scope.createFolder = function() {
        var modalInstance = $modal.open({
            controller: 'CSRCreateContractModalCtrl',
            templateUrl: 'views/csr/contracts/modal.contract.create.html',
            resolve: {
                folderId: function() {
                    return $scope.currentFolder.id;
                }
            }
        });
        modalInstance.result.then(function(modalResult) {
            console.log(modalResult);
            ContractsService.createContract(modalResult)
            .then(function(response) {
                console.log('create success: ', response);
                $scope.dtInstance.reloadData(function(result) {
                    console.log('reload: ', result);
                }, true);
            }, function(error) {
                console.log('create error: ', error);
            });
        });
    };

    $scope.edit = function(type, id) {
        /*var modalInstance = $modal.open({
            controller: 'CSREditContractModalCtrl',
            templateUrl: 'views/csr/contracts/modal.contract.edit.html',
            resolve: {
                type: function() {
                    return type;
                },
                id: function() {
                    return id;
                }
            }
        });
        modalInstance.result.then(function(modalResult) {
            ContractsService.editContract(modalResult)
            .then(function(response) {
                console.log('edit success: ', response);
                $scope.dtInstance.reloadData(function(result) {
                    console.log('reload: ', result);
                }, true);
            }, function(error) {
                console.log('edit error: ', error);
            });
        });*/
    };

    $scope.delete = function(id) {
        var modalInstance = $modal.open({
            controller: 'CSRContractDeleteConfirmModalCtrl',
            templateUrl: 'views/csr/contracts/modal.delete.confirm.html'
        });
        modalInstance.result.then(function(modalResult) {
            ContractsService.deleteContract(id)
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

    $scope.uploadFile = function() {
        var modalInstance = $modal.open({
            controller: 'CSRContractUploadModalCtrl',
            templateUrl: 'views/csr/contracts/modal.contract.upload.html'
        });
        modalInstance.result.then(function(modalResult) {
            console.log(modalResult);
        });
    };

    $scope.openFolder();
};


angular
    .module('oss')
    .controller('CSRContractsCtrl', ContractsCtrl);