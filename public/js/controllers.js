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
    
    function getMockBooks(numberOfBooks, prefix) {
        var books = [];
        
        // Generate sample book
        var sampleBook = {};
        sampleBook.title = prefix + "Sample book";
        sampleBook.description = "I am so interesting you will want to read me.";
        sampleBook.author = "John Smith";
        sampleBook.thumb = "http://placehold.it/150x200";
        
        for (var bookIdx = 0; bookIdx < numberOfBooks; bookIdx++) {
            books.push(sampleBook);
        }

        return books;        
    }
    
    function getMockShelves() {
        
        var booksPerShelf = 10;
        var names = [
          "currently reading",
          "to read",  
          "read",
          "fiction books"
        ];
        
        var shelves = [];
        var id = 0;
        
        names.forEach(function(name) {
            var shelf = {};
            shelf.id = id++;
            shelf.name = name;
            shelf.books = getMockBooks(booksPerShelf, name);
                
            shelves.push(shelf);
        }, this);
        
        return shelves;
    }
    
    // Add to scope
    $scope.shelves = getMockShelves();
    $scope.shelves.selectedShelf = $scope.shelves[0];
    $scope.selectShelf = function(shelf) {
        $scope.shelves.selectedShelf = shelf;
        console.log("selected " + shelf);
    }
    
    console.log($scope.shelves);
});