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
  .controller('AddressCtrl', [ '$scope', 'geolocationSvc', 'LocationService', 'usSpinnerService', 'MapService', '$location', function($scope, geolocationService, locationService, usSpinnerService, mapService, $location) {
    $scope.lat = undefined;
    $scope.lng = undefined;

    $scope.getGps = function () {
      usSpinnerService.spin('spinner-1');
      geolocationService.getCurrentPosition().then($scope.onUserLocationFound);
    };

    $scope.onUserLocationFound = function(location){
      usSpinnerService.stop('spinner-1');
      $scope.goToMap(location.coords.latitude,location.coords.longitude);
    };

    $scope.addressSelected = function(){
        var location = $scope.autocomplete.getPlace().geometry.location;
        $scope.lat = location.lat();
        $scope.lng = location.lng();
        $scope.goToMap($scope.lat,$scope.lng);


    };

    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        var location = $scope.autocomplete.getPlace().geometry.location;
        $scope.lat = location.lat();
        $scope.lng = location.lng();
        $scope.$apply();
        $scope.goToMap($scope.lat,$scope.lng);
        console.log(location);
    });

    $scope.goToMap = function(lat,long){
      var result = locationService.getClosestPoint(lat, long);
      result.then(function(data){
          mapService.setPoints(data);
          $location.path('/map');
      })
    };



  }]);
