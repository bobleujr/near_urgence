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
    'angularVideoBg'

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
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
