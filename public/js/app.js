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
        
        .when('/view1', {
            templateUrl: 'partials/partial1',
            controller: 'MyCtrl1'
        })
        .when('/view2', {
            templateUrl: 'partials/partial2',
            controller: 'MyCtrl2'
        }).
        otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});
