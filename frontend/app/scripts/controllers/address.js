'use strict';

/**
 * @ngdoc function
 * @name nearUrgenceApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the nearUrgenceApp
 */
angular.module('nearUrgenceApp')
  // .controller('AddressCtrl', [ '$scope', '$location', 'TypeUrgenceService', function($scope, $location, typeUrgenceService) {
  .controller('AddressCtrl', [ '$scope', 'geolocationSvc', function($scope, geolocationService) {
    $scope.lat = undefined;
    $scope.lng = undefined;

    $scope.getGps = function () {
      geolocationService.getCurrentPosition().then($scope.onUserLocationFound);
    };

    $scope.onUserLocationFound = function(location){
      console.log(location);
    };

    $scope.addressSelected = function(){
        var location = $scope.autocomplete.getPlace().geometry.location;
        $scope.lat = location.lat();
        $scope.lng = location.lng();
        console.log(location);

        // $scope.$apply();
    };

    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        var location = $scope.autocomplete.getPlace().geometry.location;
        $scope.lat = location.lat();
        $scope.lng = location.lng();
        $scope.$apply();
        console.log(location);
    });

  }]);
