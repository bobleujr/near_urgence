'use strict';

/**
 * @ngdoc function
 * @name nearUrgenceApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the nearUrgenceApp
 */
angular.module('nearUrgenceApp')
  .controller('SelectCtrl', [ '$scope', '$location', 'TypeUrgenceService', function($scope, $location, typeUrgenceService) {
    $scope.video = {
    id: '2u_t4HIuCH0'
  };

    $scope.selectPlace = function(code){
      typeUrgenceService.setServiceType(code);
      $location.path('/address');

    };
  }]);
