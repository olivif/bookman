'use strict';

// Declare app module and dependencies
var app = angular.module('bookmanApp', ['ngRoute', 'ui.router']);

// Configure routes
app.config(function ($routeProvider, $locationProvider, $stateProvider) {
    
    $stateProvider
        .state('book', {
            url: '/book',
            template: '<h1>This Is A State</h1>'
        });
    
    $routeProvider
        .when('/', {
            templateUrl: 'partials/login',
            controller: 'LoginController'
        })
        .when('/home', {
            templateUrl: 'partials/home',
            controller: 'HomeController'
        })
        .when('/book', {
            templateUrl: 'partials/book/:title',
            controller: 'BookController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});
