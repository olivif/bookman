'use strict';

// AppController
app.controller('AppController', function ($scope, $http) {

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