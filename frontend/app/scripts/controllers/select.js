'use strict';

/**
 * @ngdoc function
 * @name nearUrgenceApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the nearUrgenceApp
 */
angular.module('nearUrgenceApp')
  .controller('SelectCtrl', [ '$scope', function($scope) {
    $scope.video = {
    id: '2u_t4HIuCH0'
  };

    $scope.selectPlace = function($scope, code){
      if(code === 1){
        console.log("is it");
      }
    };
    // console.log(')
  }]);
