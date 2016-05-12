(function() {
  'use strict';

  angular.module('app')
    .controller('SignupController', function ($scope, $http, $window, $location, $rootScope) {
      $scope.newUser = function(){
        $http.post('/api/v1/users/signup', $scope.user).then(function (response) {
          $rootScope.user = response.data;
          $window.localStorage.setItem('token', response.data.token);
          $location.path('/');
        })
      }
    })

}());
