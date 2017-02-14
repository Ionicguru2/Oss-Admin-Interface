/**
 * oss - Responsive Admin Panel
 *
 */
(function () {
    angular.module('oss', [
        'ui.router',                    // Routing
        'ui.bootstrap',                 // Bootstrap
        'oc.lazyLoad',					// LazyLoad
        'datatables',					// Data Table
        'datatables.factory',
        'datatables.buttons',
        'datatables.tabletools',
        'ui.bootstrap',
        'LocalStorageModule',			// Local Storage Service
        'ngFileUpload'
    ])
})();