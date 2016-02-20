'use strict';

// AppController
app.controller('AppController', ["$scope", "userService", function ($scope, userService) {
    
    // Load user name 
    userService.getUserName()
        .success(function (data, status, headers, config) {
            $scope.userName = data;
        })
        .error(function (data, status, headers, config) {
            // set some error somewhere
        });  
}]);

// HomeController
app.controller('HomeController', ["$scope", "bookService", function ($scope, bookService) {
    
    // Get shelves
    $scope.shelves = bookService.getShelves();
    $scope.shelves.selectedShelf = $scope.shelves[0];
    $scope.selectShelf = function(shelf) {
        $scope.shelves.selectedShelf = shelf;
        console.log("selected " + shelf);
    }
    
    $scope.testVariable = "test";
}]);

// LoginController
app.controller('LoginController', function ($scope) {
});