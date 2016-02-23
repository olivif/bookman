// BookController
app.controller('BookController', ['$scope', '$routeParams', function ($scope, $routeParams) {

    function initializeBook() {
        var book = {};
        book.title = $routeParams.title;

        return book;
    }
    
    $scope.book = initializeBook();
}]);