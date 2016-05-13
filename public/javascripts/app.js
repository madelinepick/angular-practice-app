(function() {
  'use strict';

  // √ new route
  // √ new template
  // √ new controller
  // call the server /me
  //  IF that's a user, show the page
  //  IF that's an error, redirect to login (home)
  // cleanup the code a bit

  angular.module('app', ['ngRoute'])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
      $httpProvider.interceptors.push("authInterceptor");

      $routeProvider
       .when('/', {
        templateUrl: '/templates/home.html',
        controller: 'HomeController',
        resolve: {
          currentUser: function ($http) {
            return $http.get('/api/v1/users/me')
              .then(function (response) {
                return response.data
              })
              .catch(function () {
                localStorage.clear();
                return null;
              })
          }
        }
      })
      .when('/signup', {
        templateUrl: '/templates/signup.html',
        controller: 'SignupController'
      })
      .when('/beers', {
        templateUrl: '/templates/beers.html',
        controller: 'BeersController',
        requiresLogin: true, // I can put arbitrary data on a route
        resolve: {
          currentUser: function ($http, $location) {
            return $http.get('/api/v1/users/me')
              .then(function (response) {
                return response.data
              })
              .catch(function () {
                localStorage.clear();
                $location.path("/")
                return null;
              })
          }
        }
      });

      $locationProvider.html5Mode(true);
    });

    // app.run runs once when the app starts
    // this improves user experience
    angular.module('app').run(function ($rootScope, $location, $window) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        // if the next route requires login
        // and we don't have a token
        // then redirect to the homepage

        if (next.$$route.requiresLogin && !localStorage.getItem('token')) {
          $location.path('/');
        }

      });
    });

    angular.module('app').factory('authInterceptor', function ($location) {
      return {
        request: function(config) {
          if (localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
          }

          return config;
        },

        responseError: function(response) {
          if(response.status === 403){
            localStorage.clear();
            $location.path('/');
          }
          return response;
        }
      };
    })

}());
