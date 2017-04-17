'use strict';

/**
 * @ngdoc overview
 * @name nearUrgenceApp
 * @description
 * # nearUrgenceApp
 *
 * Main module of the application.
 */
angular
  .module('nearUrgenceApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'leaflet-directive',
    'angularVideoBg',
    'angularSpinner',
    // 'gm'

  ])
  //'gm',

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/select.html',
        controller: 'SelectCtrl',
        controllerAs: 'select'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })
      .when('/address', {
        templateUrl: 'views/address.html',
        controller: 'AddressCtrl',
        controllerAs: 'address'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


angular
  .module('nearUrgenceApp').service('TypeUrgenceService', function() {
    var serviceType = 0;

    var setServiceType = function(obj) {
      serviceType = obj;
    };

    var getServiceType = function() {
      return serviceType;
    };


  return {
    setServiceType: setServiceType,
    getServiceType: getServiceType
  };

});

angular
  .module('nearUrgenceApp').factory('geolocationSvc', ['$q', '$window', function ($q, $window) {

    function getCurrentPosition() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }

    return {
        getCurrentPosition: getCurrentPosition
    };
}]);

angular
  .module('nearUrgenceApp').service('LocationService', ['$q', 'TypeUrgenceService', '$http', function ($q, typeService, $http) {
    var lat, long;



    function setOriginPoint(lat1,long1){
      lat = lat1;
      long = long1;
    }

    function getOriginPoint(){
      return {'lat':lat,'long':long};
    }

    function getClosestPoint(lat, long) {
        var deferred = $q.defer();
          //flaks-nearurgence.herokuapp.com/coordinates
          //
          $http.get('https://flaks-nearurgence.herokuapp.com/'+lat+'/'+long+'/'+typeService.getServiceType()+'/',
          // $http.get('http://127.0.0.1:5000/'+lat+'/'+long+'/'+typeService.getServiceType()+'/',
          //   { params : {
          //   lat:lat,
          //   long:long,
          //   type:typeService.getServiceType()
          //   } },
            {
              'Content-Type': 'application/json'
            }
          ).then(
            function(data, status, headers, config) {
                deferred.resolve(data);
            },
            function(data, status, headers, config) {
                deferred.reject(data);
            }
          );

        return deferred.promise;
    }

    return {
        getClosestPoint: getClosestPoint,
        getOriginPoint: getOriginPoint,
        setOriginPoint: setOriginPoint,
    };

}]);


angular
  .module('nearUrgenceApp').service('MapService', function() {
    var points = 0;

    var setPoints = function(obj) {
      points = obj;
    };

    var getPoints = function() {
      return points;
    };


  return {
    setPoints: setPoints,
    getPoints: getPoints
  };

});

angular
  .module('nearUrgenceApp').config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);


// (function(window, document) {

// // Create all modules and define dependencies to make sure they exist
// // and are loaded in the correct order to satisfy dependency injection
// // before all nested files are concatenated by Grunt

// // Config
// angular.module('gm.config', [])
//     .value('gm.config', {
//         debug: true,
//         placess: {
//             autocomplete: {}
//         }
//     })
//     .run(['$window', function($window){

//         // Check for dependencies
//         if(
//             angular.isUndefined($window.google) ||
//             angular.isUndefined($window.google.maps)
//             ){
//             throw new Error('Google Maps API not available, please make sure the Google Maps library is loaded before the AngularJS Google Maps library is loaded');
//         }
//     }]);

// // Places modules
// angular.module('gm.places.directives', []);
// angular.module('gm.places', [
//     'gm.places.directives'
// ])
//     .run(['$window', function($window){

//         // Check for dependencies
//         if(
//             angular.isUndefined($window.google) ||
//             angular.isUndefined($window.google.maps) ||
//             angular.isUndefined($window.google.maps.places) ||
//             angular.isUndefined($window.google.maps.places.Autocomplete)
//             ){
//             throw new Error('Google Maps API not available, please make sure the Google Maps library is loaded before the AngularJS Google Maps library is loaded');
//         }
//     }]);

// // Modules
// angular.module('gm.directives', []);
// angular.module('gm.filters', []);
// angular.module('gm.services', []);
// angular.module('gm', [
//     'gm.config',
//     'gm.directives',
//     'gm.filters',
//     'gm.services',
//     'gm.places'
// ]);
// /**
//  * Logger service
//  */
// angular.module('gm.services')
//     .factory('logger', ['$log', '$window', function ($log, $window) {

//         // Create service
//         var service = {};

//         // Proxy regular methods to $log
//         angular.forEach(['log', 'info', 'warn', 'error'], function(method){
//             service[method] = function(){
//                 return $log[method](arguments);
//             };
//         });


//         // Add dir method to hierarchically display objects
//         service.dir = function (obj, title) {
//             if ($window.console) {
//                 if (angular.isDefined(title)) {
//                     $log.info(title + ':');
//                 }
//                 $window.console.dir(obj);
//             }
//         };

//         return service;
//     }]);angular.module('gm.places')
//     .directive('gmPlacesAutocomplete', ['$rootScope', 'gm.config', 'logger', function($rootScope, gmConfig, logger){

//         var configOptions = (gmConfig.places && gmConfig.places.autocomplete) || {};

//         return {
//             restrict: 'AEC',
//             require : ['gmPlacesAutocomplete', '?ngModel'],
//             controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude){

//                 this._options = angular.extend({}, configOptions, $scope.$eval($attrs.gmOptions));
//                 this._element = $element[0];
//                 this._api = undefined;

//                 // Define properties
//                 Object.defineProperties(this, {
//                     element: {
//                         get: function(){
//                             return this._element;
//                         },
//                         configurable: false
//                     },
//                     api: {
//                         get: function(){
//                             return this._api;
//                         },
//                         configurable: false
//                     }
//                 });

//                 try {
//                     this._api = new google.maps.places.Autocomplete(this._element, this._options);
//                 }
//                 catch (err)
//                 {
//                     if(gmConfig.debug) logger.log('Could not instantiate gmPlacesAutocomplete directive: ' + err.message);
//                 }

//             }],
//             link: function(scope, iElement, iAttrs, controllers){

//                 // Define controllers
//                 var gmPlacesAutocompleteController = controllers[0];
//                 var ngModelController = controllers[1];

//                 // Set initial model value if a model is defined
//                 if (ngModelController) {
//                     ngModelController.$setViewValue(gmPlacesAutocompleteController.api);
//                 }

//                 // Listen to place_changed event
//                 google.maps.event.addListener(gmPlacesAutocompleteController.api, 'place_changed',
//                     (function(scope, iElement, iAttrs, gmPlacesAutocompleteController, ngModelController, $rootScope){
//                         return function(){

//                             // Update model if there is one
//                             if (ngModelController) {
//                                 ngModelController.$setViewValue(gmPlacesAutocompleteController.api);
//                             }

//                             // Broadcast event
//                             $rootScope.$broadcast('gmPlacesAutocomplete::placeChanged', gmPlacesAutocompleteController);
//                         };
//                     })(scope, iElement, iAttrs, gmPlacesAutocompleteController, ngModelController, $rootScope)
//                 );

//             }
//         };

//     }]);})(window, document);
