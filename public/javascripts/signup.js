(function() {
  'use strict';

  angular.module('app')
    .controller('SignupController', function ($scope, $http, $window, $location) {
      $scope.newUser = function(){
        $http.post('/api/v1/users/signup', $scope.user).then(function (response) {
          $window.localStorage.setItem('token', response.data.token);
          $location.path('/');
        })
      }
    })

}());
