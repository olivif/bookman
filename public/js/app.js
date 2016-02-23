'use strict';

// Declare app module and dependencies
var app = angular.module('bookmanApp', ['ngRoute']);

// Configure routes
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/login',
            controller: 'LoginController'
        })
        .when('/home', {
            templateUrl: 'partials/home',
            controller: 'HomeController'
        })
        .when('/book/:title', {
            templateUrl: 'partials/book',
            controller: 'BookController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});
