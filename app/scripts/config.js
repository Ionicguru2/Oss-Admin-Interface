/**
 * oss - Responsive Admin Panel
 *
 * oss theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, localStorageServiceProvider, $httpProvider) {
    
    localStorageServiceProvider.setPrefix('oss');

    $ocLazyLoadProvider.config({
        debug: true
    });

    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $urlRouterProvider.otherwise("/login");

    $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl',
            data: { pageTitle: 'Login', specialClass: 'gray-bg' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/login/login.controller.js',
                            'scripts/services/users.service.js',
                        ]
                    }]);
                }]
            }
        })
        // routes for admin dashboard
        .state('admin', {
            abstract: true,
            url: "/admin",
            templateUrl: "views/admin/common/content.html",
            controller: 'AdminMainCtrl',
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/main/main.controller.js',
                            'scripts/services/users.service.js',
                            'scripts/services/countries.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('admin.internal-user', {
            url: "/internal-user",
            templateUrl: "views/admin/users/users.internal.html",
            controller: 'AdminInternalUserCtrl',
            data: { pageTitle: 'Internal Users' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/users/internal.controller.js',
                            'scripts/controllers/admin/users/modal.controller.js',
                            'scripts/services/users.service.js',
                            'scripts/services/companies.service.js'
                        ]
                    }]);
                }]
            }
        })
        .state('admin.external-user', {
            url: "/external-user",
            templateUrl: "views/admin/users/users.external.html",
            data: { pageTitle: 'External Users' },
            controller: 'AdminExternalUserCtrl',
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/users/external.controller.js',
                            'scripts/controllers/admin/users/modal.controller.js',
                            'scripts/services/users.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('admin.pin-request', {
            url: "/pin-request",
            templateUrl: "views/admin/pin/pin.html",
            controller: 'AdminPinCtrl',
            data: { pageTitle: 'Pin Request Change' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/pin/pin.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('admin.companies', {
            url: "/companies",
            templateUrl: "views/admin/companies/companies.html",
            controller: 'AdminCompaniesCtrl',
            data: { pageTitle: 'Companies' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/companies/companies.controller.js',
                            'scripts/controllers/admin/companies/modal.controller.js',
                            'scripts/services/companies.service.js',
                            'scripts/services/regions.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('admin.contracts', {
            url: "/contracts",
            templateUrl: "views/admin/contracts/contracts.html",
            controller: 'AdminContractsCtrl',
            data: { pageTitle: 'Contracts' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/contracts/contracts.controller.js',
                            'scripts/controllers/admin/contracts/modal.controller.js',
                            'scripts/services/contracts.service.js'
                        ]
                    }]);
                }]
            }
        })
        .state('admin.transaction', {
            url: '/transaction',
            template: '<ui-view></ui-view>',
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/transactions/modal.controller.js',
                            'scripts/services/transactions.service.js'
                        ]
                    }]);
                }]
            }
        })
        .state('admin.transaction.current', {
            url: "/current",
            templateUrl: "views/admin/transactions/current.html",
            controller: 'AdminCurrentTransactionCtrl',
            data: { pageTitle: 'Current Transaction' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/transactions/current.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('admin.transaction.past', {
            url: "/past",
            templateUrl: "views/admin/transactions/past.html",
            controller: 'AdminPastTransactionCtrl',
            data: { pageTitle: 'Past Transaction' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/transactions/past.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('admin.products', {
            url: "/products",
            templateUrl: "views/admin/products/products.html",
            controller: 'AdminProductsCtrl',
            data: { pageTitle: 'Products' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/products/products.controller.js',
                            'scripts/controllers/admin/products/modal.controller.js',
                            'scripts/services/products.service.js',
                            'scripts/services/categories.service.js',
                            'scripts/services/countries.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('admin.settings', {
            url: "/settings",
            templateUrl: "views/admin/settings/settings.html",
            controller: 'AdminSettingsCtrl',
            data: { pageTitle: 'Settings' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/admin/settings/settings.controller.js',
                            'scripts/services/users.service.js',
                            'scripts/services/regions.service.js',
                            'scripts/services/countries.service.js',
                        ]
                    }]);
                }]
            }
        })
        // routes for basic dashboard
        .state('basic', {
            abstract: true,
            url: "/basic",
            templateUrl: "views/basic/common/content.html",
            controller: 'BasicMainCtrl',
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/basic/main/main.controller.js',
                            'scripts/services/users.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('basic.my-info', {
            url: "/my-info",
            templateUrl: "views/basic/myinfo/myinfo.html",
            controller: 'BasicSettingsCtrl',
            data: { pageTitle: 'Settings' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/basic/myinfo/myinfo.controller.js',
                            'scripts/services/regions.service.js',
                            'scripts/services/companies.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('basic.contracts', {
            url: "/contracts",
            templateUrl: "views/basic/contracts/contracts.html",
            controller: 'BasicContractsCtrl',
            data: { pageTitle: 'Contracts' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/basic/contracts/contracts.controller.js',
                            'scripts/controllers/basic/contracts/modal.controller.js',
                            'scripts/services/contracts.service.js'
                        ]
                    }]);
                }]
            }
        })
        .state('basic.transaction', {
            url: '/transaction',
            template: '<ui-view></ui-view>',
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/basic/transactions/modal.controller.js',
                            'scripts/services/transactions.service.js'
                        ]
                    }]);
                }]
            }
        })
        .state('basic.transaction.current', {
            url: "/current",
            templateUrl: "views/basic/transactions/current.html",
            controller: 'BasicCurrentTransactionCtrl',
            data: { pageTitle: 'Current Transaction' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/basic/transactions/current.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('basic.transaction.past', {
            url: "/past",
            templateUrl: "views/basic/transactions/past.html",
            controller: 'BasicPastTransactionCtrl',
            data: { pageTitle: 'Past Transaction' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/basic/transactions/past.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('basic.products', {
            url: "/products",
            templateUrl: "views/basic/products/products.html",
            controller: 'BasicProductsCtrl',
            data: { pageTitle: 'Products' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/basic/products/products.controller.js',
                            'scripts/controllers/basic/products/modal.controller.js',
                            'scripts/services/products.service.js',
                            'scripts/services/categories.service.js',
                            'scripts/services/countries.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('basic.settings', {
            url: "/settings",
            templateUrl: "views/basic/settings/settings.html",
            controller: 'BasicSettingsCtrl',
            data: { pageTitle: 'Settings' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/basic/settings/settings.controller.js',
                            'scripts/services/regions.service.js',
                        ]
                    }]);
                }]
            }
        })
        // routes for csr dashboard
        .state('csr', {
            abstract: true,
            url: "/csr",
            templateUrl: "views/csr/common/content.html",
            controller: 'CSRMainCtrl',
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/csr/main/main.controller.js',
                            'scripts/services/users.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('csr.external-user', {
            url: "/external-user",
            templateUrl: "views/csr/users/users.html",
            controller: 'CSRExternalUserCtrl',
            data: { pageTitle: 'External Users' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/csr/users/external.controller.js',
                            'scripts/controllers/csr/users/modal.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('csr.contracts', {
            url: "/contracts",
            templateUrl: "views/csr/contracts/contracts.html",
            controller: 'CSRContractsCtrl',
            data: { pageTitle: 'Contracts' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/csr/contracts/contracts.controller.js',
                            'scripts/controllers/csr/contracts/modal.controller.js',
                            'scripts/services/contracts.service.js'
                        ]
                    }]);
                }]
            }
        })
        .state('csr.transaction', {
            url: '/transaction',
            template: '<ui-view></ui-view>',
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/csr/transactions/modal.controller.js',
                            'scripts/services/transactions.service.js'
                        ]
                    }]);
                }]
            }
        })
        .state('csr.transaction.current', {
            url: "/current",
            templateUrl: "views/csr/transactions/current.html",
            controller: 'CSRCurrentTransactionCtrl',
            data: { pageTitle: 'Current Transaction' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/csr/transactions/current.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('csr.transaction.past', {
            url: "/past",
            templateUrl: "views/csr/transactions/past.html",
            controller: 'CSRPastTransactionCtrl',
            data: { pageTitle: 'Past Transaction' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/csr/transactions/past.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('csr.products', {
            url: "/products",
            templateUrl: "views/csr/products/products.html",
            controller: 'CSRProductsCtrl',
            data: { pageTitle: 'Products' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/csr/products/products.controller.js',
                            'scripts/controllers/csr/products/modal.controller.js',
                            'scripts/services/products.service.js',
                            'scripts/services/categories.service.js',
                            'scripts/services/countries.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('csr.settings', {
            url: "/settings",
            templateUrl: "views/csr/settings/settings.html",
            controller: 'CSRSettingsCtrl',
            data: { pageTitle: 'Settings' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/csr/settings/settings.controller.js',
                            'scripts/services/regions.service.js',
                            'scripts/services/countries.service.js',
                        ]
                    }]);
                }]
            }
        })
        // routes for power dashboard
        .state('power', {
            abstract: true,
            url: "/power",
            templateUrl: "views/power/common/content.html",
            controller: 'PowerMainCtrl',
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/power/main/main.controller.js',
                            'scripts/services/users.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('power.members', {
            url: "/members",
            templateUrl: "views/power/users/users.internal.html",
            controller: 'PowerUserCtrl',
            data: { pageTitle: 'Manage Members' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/power/users/users.controller.js',
                            'scripts/controllers/power/users/modal.controller.js',
                            'scripts/services/users.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('power.contracts', {
            url: "/contracts",
            templateUrl: "views/power/contracts/contracts.html",
            controller: 'PowerContractsCtrl',
            data: { pageTitle: 'Contracts' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/power/contracts/contracts.controller.js',
                            'scripts/controllers/power/contracts/modal.controller.js',
                            'scripts/services/contracts.service.js'
                        ]
                    }]);
                }]
            }
        })
        .state('power.transaction', {
            url: '/transaction',
            template: '<ui-view></ui-view>',
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/power/transactions/modal.controller.js',
                            'scripts/services/transactions.service.js'
                        ]
                    }]);
                }]
            }
        })
        .state('power.transaction.current', {
            url: "/current",
            templateUrl: "views/power/transactions/current.html",
            controller: 'PowerCurrentTransactionCtrl',
            data: { pageTitle: 'Current Transaction' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/power/transactions/current.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('power.transaction.past', {
            url: "/past",
            templateUrl: "views/power/transactions/past.html",
            controller: 'PowerPastTransactionCtrl',
            data: { pageTitle: 'Past Transaction' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/power/transactions/past.controller.js',
                        ]
                    }]);
                }]
            }
        })
        .state('power.products', {
            url: "/products",
            templateUrl: "views/power/products/products.html",
            controller: 'PowerProductsCtrl',
            data: { pageTitle: 'Products' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/power/products/products.controller.js',
                            'scripts/controllers/power/products/modal.controller.js',
                            'scripts/services/products.service.js',
                            'scripts/services/categories.service.js',
                            'scripts/services/countries.service.js',
                        ]
                    }]);
                }]
            }
        })
        .state('power.settings', {
            url: "/settings",
            templateUrl: "views/power/settings/settings.html",
            controller: 'PowerSettingsCtrl',
            data: { pageTitle: 'Settings' },
            resolve: {
                loadJS: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'scripts/controllers/power/settings/settings.controller.js',
                            'scripts/services/countries.service.js',
                            'scripts/services/regions.service.js',
                        ]
                    }]);
                }]
            }
        });
}
angular
    .module('oss')
    .config(config)
    .run(function($rootScope, $state, $http, $location) {
        $rootScope.$state = $state;
        $http.defaults.headers.post['dataType'] = 'json';
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            if (!$rootScope.loggedInUser && (!next.includes('login'))) {
                //$location.path('login');
            }
            
        });
    });