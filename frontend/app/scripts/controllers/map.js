'use strict';

/**
 * @ngdoc function
 * @name nearUrgenceApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the nearUrgenceApp
 */
angular.module('nearUrgenceApp')
  .controller('MapCtrl', [ '$scope', 'leafletBoundsHelpers', 'MapService', function($scope, leafletBoundsHelpers, mapService) {

    angular.extend($scope, {
                geojson: {
                    data: mapService.getPoints().data
                  // ,
                  //   style: {
                  //       fillColor: "green",
                  //       weight: 2,
                  //       opacity: 1,
                  //       color: 'white',
                  //       dashArray: '3',
                  //       fillOpacity: 0.7
                  //   }
                },
                defaults: {
                      scrollWheelZoom: false
                },
                center: {
                  lat: mapService.getPoints().data[0].geometry.coordinates[1],
                  lng: mapService.getPoints().data[0].geometry.coordinates[0],
                  zoom: 18
                }

            });


    // angular.extend($scope, {
    //     defaults: {
    //         scrollWheelZoom: false
    //     }
    // });

    // function buildGeoJSON (){
    //     var myList;
    //     angular.forEach(mapService.getPoints(), function() {
    //       var obj = {
    //         type: ""
    //       }
    //     });

    // }

  }]);
