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
    
    var books = [];
    
    // Generate sample book
    var sampleBook = {};
    sampleBook.title = "Sample book";
    sampleBook.description = "I am so interesting you will want to read me.";
    sampleBook.author = "John Smith";
    sampleBook.thumb = "http://placehold.it/150x200";
    
    // Push 10 books
    var numberOfBooks = 10;
    for (var bookIdx = 0; bookIdx < numberOfBooks; bookIdx++) {
        books.push(sampleBook);
    }
    
    // Add to scope
    $scope.books = books;
    
});