'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('things example page', {
            url: '/things/example',
            templateUrl: 'things/views/index.html'
        });
    }
]);
