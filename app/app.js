'use strict';

angular.module('ngSocial', [
  'ngRoute',
  'ngSocial.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
