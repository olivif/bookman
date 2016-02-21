// HomeController
app.controller('HomeController', ["$scope", "bookService", function ($scope, bookService) {


    function setupShelves(shelves) {
        $scope.shelves = shelves;
        $scope.shelves.selectedShelf = $scope.shelves[0];
        $scope.selectShelf = function (shelf) {
            $scope.shelves.selectedShelf = shelf;
            console.log("selected " + shelf);
        }
    }

    bookService.getShelves()
        .success(function (data, status, headers, config) {
            setupShelves(data);
            console.log(data);
        })
        .error(function (data, status, headers, config) {
            // set some error somewhere
        });

}]);
