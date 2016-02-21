// HomeController
app.controller('HomeController', ["$scope", "bookService", function ($scope, bookService) {

    function setupShelves(shelves) {
        // Add placeholder book objects until the data loads
        shelves.forEach(function (shelf) {
            shelf.books = [];
            for (var bookIdx = 0; bookIdx < shelf.bookCount; bookIdx++) {
                shelf.books.push({});
                shelf.loading = true;
            } 
        });

        // Now setup to scope
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
            
            // Then also for each shelf, queue up a request to get
            // all the books and store it once it comes.
            data.forEach(function (shelf) {
                bookService.getBooks(shelf.name)
                    .success(function (data, status, headers, config) {
                        console.log("got back books for " + shelf.name);
                        console.log(data);
                        console.log();
                        shelf.books = data;
                        shelf.loading = false;
                    })
                    .error(function (data, status, headers, config) {
                        // set some error somewhere
                    });
            }, this);
        })
        .error(function (data, status, headers, config) {
            // set some error somewhere
        });

}]);
