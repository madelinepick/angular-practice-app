(function() {
  'use strict';

  angular.module('app')
    .controller('HomeController', function ($scope, currentUser) {
      console.log(currentUser);
      $scope.user = currentUser;
    })

}());
