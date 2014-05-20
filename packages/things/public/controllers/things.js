'use strict';

angular.module('mean').controller('ThingsController', ['$scope', 'Global',
    function($scope, Global, Things) {
        $scope.global = Global;
        $scope.things = {
            name: 'things'
        };

    $scope.map = {
        center: {
            latitude: 45,
            longitude: -73
        },
        zoom: 8
    };

    }
]);
