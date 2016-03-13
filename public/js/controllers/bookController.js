// BookController
app.controller('BookController', ['$scope', '$routeParams', 'bookService',
    function ($scope, $routeParams, bookService) {

        function getAuthorBooks(authorId, page) {
            bookService.getAuthorBooks(authorId, page)
                .success(function (data, status, headers, config) {
                    $scope.authorBooks = data;
                })
                .error(function (data, status, headers, config) {
                    $scope.error = Errors.FAILED_LOAD_BOOKS_FOR_AUTHOR;
                });
        }

        function initializeContent() {
            // get the current book
            $scope.book = bookService.getCurrentBook();

            if ($scope.book != undefined) {
                // get more content based on it
                getAuthorBooks($scope.book.author.id, 1);
            }
        }

        initializeContent();
    }]);