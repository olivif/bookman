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
    
    function getMockBooks(numberOfBooks) {
        var books = [];
        
        // Generate sample book
        var sampleBook = {};
        sampleBook.title = "Sample book";
        sampleBook.description = "I am so interesting you will want to read me.";
        sampleBook.author = "John Smith";
        sampleBook.thumb = "http://placehold.it/150x200";
        
        for (var bookIdx = 0; bookIdx < numberOfBooks; bookIdx++) {
            books.push(sampleBook);
        }

        return books;        
    }
    
    function getMockShelves() {
        var names = [
          "currently reading",
          "to read",  
          "read",
          "fiction books"
        ];
        
        var shelves = [];
        names.forEach(function(name) {
            shelves.push({ name: name });
        }, this);
        
        return shelves;
    }
    
    // Add to scope
    $scope.books = getMockBooks(10);
    $scope.shelves = getMockShelves();
    
    console.log($scope.books);
    console.log($scope.shelves);
});