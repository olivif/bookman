'use strict';

// Declare app module and dependencies
var app = angular.module('bookmanApp', [
    'bookmanApp.filters',
    'bookmanApp.directives'
]);

// Configure routes
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'partials/partial1',
            controller: 'LoggedInController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});
