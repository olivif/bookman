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
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});
