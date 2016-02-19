'use strict';

// Declare app module and dependencies
var app = angular.module('bookmanApp', [
    'bookmanApp.controllers',
    'bookmanApp.filters',
    'bookmanApp.services',
    'bookmanApp.directives'
]);

// Configure routes
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/view1', {
            templateUrl: 'partials/partial1',
            controller: 'MyCtrl1'
        })
        .when('/view2', {
            templateUrl: 'partials/partial2',
            controller: 'MyCtrl2'
        }).
        otherwise({
            redirectTo: '/view1'
        });

    $locationProvider.html5Mode(true);
});
