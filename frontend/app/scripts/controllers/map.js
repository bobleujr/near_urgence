'use strict';

/**
 * @ngdoc function
 * @name nearUrgenceApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the nearUrgenceApp
 */
angular.module('nearUrgenceApp')
  .controller('MapCtrl', [ '$scope', 'leafletBoundsHelpers', 'MapService', 'TypeUrgenceService' function($scope, leafletBoundsHelpers, mapService, typeUrgenceService) {

    angular.extend($scope, {
                geojson: {
                    data: mapService.getPoints().data,
                    // ,
                    onEachFeature: function(feature,layer){
                      var message = '';
                      if (typeUrgenceService.getServiceType() == 0){
                        message = "Name: "+ feature.properties.LABEL+"<br>"+
                                    "Address: "+ feature.properties.FULL_ADDRE+"<br>"+
                                    "Provider: "+ feature.properties.PROVIDER+"<br>"+
                                    "Postal Code: "+ feature.properties.P_Code+"<br>";

                      } else if (typeUrgenceService.getServiceType() == 1){
                        message = "Name: "+ feature.properties.LABEL+"<br>"+
                                    "Address: "+ feature.properties.ADDRESS+"<br>"+
                                    "GTA City: "+ feature.properties.MUN_NAME+"<br>"+
                                    "Area: "+ feature.properties.WARD_NAME+"<br>";
                      } else if (typeUrgenceService.getServiceType() == 2){
                        message = "Name: "+ feature.properties.EMS_NAME+"<br>"+
                                    "Address: "+ feature.properties.EMS_ADDRES+"<br>";
                                    // "GTA City: "+ feature.properties.MUN_NAME+"<br>"+
                                    // "Area: "+ feature.properties.WARD_NAME+"<br>";

                      }
                      // else(typeUrgenceService.getServiceType() == 3){
                      //   message = "Name: "+ feature.properties.LABEL+"<br>"+
                      //               "Address: "+ feature.properties.FULL_ADDRE+"<br>"+
                      //               "GTA City: "+ feature.properties.MUN_NAME+"<br>"+
                      //               "Area: "+ feature.properties.WARD_NAME+"<br>";
                      //
                      // }



                      layer.bindPopup(message);
                    }
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
