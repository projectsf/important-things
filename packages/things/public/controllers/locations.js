'use strict';

angular.module('mean').controller('LocationsController', ['$scope',
    function($scope) {
        $scope.map = {
          center: {
            latitude: 37.7616535,
            longitude: -122.4491129 
          },
          zoom : 14
        };
        $scope.marker = {
          coords: {
            latitude: 37.7616535,
            longitude: -122.4491129 
          },
          options: {
            title: 'bbb home'
          }

        };
    }
]);
