'use strict';

angular.module('ngSocial.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  }); 
}])

.config(['$facebookProvider',function($facebookProvider) {
  $facebookProvider.setAppId('1753491314883245');
  $facebookProvider.setPermissions('email', 'public_profile', 'user_posts', 
    'publish_actions', 'user_photos');
}])

.run( function($rootScope ) {
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook){
  refresh();

  $scope.login = function () {
    $facebook
      .login()
      .then(function () {
        refresh();
      });
  };

  $scope.logout = function () {
    $facebook
      .logout()
      .then(function () {
        refresh();
      });
  };

  function refresh() {
    $facebook
      .api('/me')
      .then(function (response) {
        $scope.welcomeMsg = 'Welcome ' + response.name;
        $scope.userInfo = response;
        $scope.isLoggedIn = true;

        return $facebook.api('/me/picture');
      })
      .then(function (response) {
        $scope.picture = response.data.url;

        return $facebook.api('/me/permissions'); 
      })
      .then(function(permissions) {
          $scope.permissions = permissions;
      })
      .catch(function () {
        $scope.isLoggedIn = false;
        $scope.welcomeMsg = 'Please Log In';
      });
  }
}]);