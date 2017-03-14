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
    'gm'

  ])
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
    function getClosestPoint(lat, long) {
        var deferred = $q.defer();

          $http.post('http://127.0.0.1:5000/',{
            lat:lat,
            long:long,
            type:typeService.getServiceType()
          }).then(
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
        getClosestPoint: getClosestPoint
    };

}]);
