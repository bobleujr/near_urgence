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
  .controller('AddressCtrl', [ '$scope', 'geolocationSvc', 'LocationService', function($scope, geolocationService, locationService) {
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

        $scope.goToMap(lat,long);

        // $scope.$apply();
    };

    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        var location = $scope.autocomplete.getPlace().geometry.location;
        $scope.lat = location.lat();
        $scope.lng = location.lng();
        $scope.$apply();
        locationService.getClosestPoint($scope.lat, $scope.lng);
        console.log(location);
    });

    $scope.goToMap = function(lat,long){
      var result = location(lat,long);
      result.then(function(data){
        console.log(data);
      })
    };



  }]);
