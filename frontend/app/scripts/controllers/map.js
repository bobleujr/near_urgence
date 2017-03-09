'use strict';

/**
 * @ngdoc function
 * @name nearUrgenceApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the nearUrgenceApp
 */
angular.module('nearUrgenceApp')
  .controller('MapCtrl', [ '$scope', function($scope) {

    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        }
    });

  }]);
