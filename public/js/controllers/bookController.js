// BookController
app.controller('BookController', ['$scope', '$routeParams', "bookService", function ($scope, $routeParams, bookService) {

    $scope.book = bookService.getCurrentBook();
}]);