'use strict';

// AppController
app.controller('AppController', function ($scope, $http) {
});

// HomeController
app.controller('HomeController', ["$scope", "bookService", function ($scope, bookService) {
    
    // Get shelves
    $scope.shelves = bookService.getShelves();
    $scope.shelves.selectedShelf = $scope.shelves[0];
    $scope.selectShelf = function(shelf) {
        $scope.shelves.selectedShelf = shelf;
        console.log("selected " + shelf);
    }
}]);

// LoggedInController
app.controller('LoggedInController', function ($scope, $http) {
});