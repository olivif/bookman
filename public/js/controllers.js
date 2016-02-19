'use strict';

// Controllers module
var controllers = angular.module('bookmanApp.controllers', []);

// AppController
controllers.controller('AppController', function ($scope, $http) {

    $http({
        method: 'GET',
        url: '/api/name'
    }).
        success(function (data, status, headers, config) {
            $scope.name = data.name;
        }).
        error(function (data, status, headers, config) {
            $scope.name = 'Error!';
        });

});

// MyCtrl1
controllers.controller('MyCtrl1', function ($scope) {
});

// MyCtrl2
controllers.controller('MyCtrl2', function ($scope) {
});

// HomeController
controllers.controller('HomeController', function ($scope) {
});