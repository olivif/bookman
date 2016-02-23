// HomeController
app.controller('HomeController', ["$scope", "bookService", "Errors", function ($scope, bookService, Errors) {

    function setupShelves(shelves) {
        // Add placeholder book objects until the data loads
        shelves.forEach(function (shelf) {
            shelf.books = [];
            for (var bookIdx = 0; bookIdx < shelf.bookCount; bookIdx++) {
                shelf.books.push({});
            }
        });

        // Now setup to scope
        $scope.shelves = shelves;
        $scope.shelves.selectedShelfId = $scope.shelves[0].id;
        $scope.selectShelf = function (id) {
            $scope.shelves.selectedShelfId = id;
        }
    }

    function updateShelf(shelfToUpdate) {
        $scope.shelves.forEach(function (shelf) {
            if (shelf.id === shelfToUpdate.id) {
                shelf = shelfToUpdate;
            }
        }, this);
    }
    function loadBooksForShelf(shelf, page) {

        if (shelf === undefined) {
            // If no shelf is passed in we use the currently selected one.
            shelf = $scope.getCurrentShelf();
        }
        if (page === undefined) {
            // We didnt get a page so we'll just load the next one.
            page = shelf.lastPageLoaded + 1;
        }
        if (page === 1) {
            // If we're on the first page we have to wipe the old data first.
            shelf.books = [];
        }

        bookService.getBooks(shelf.name, page)
            .success(function (data, status, headers, config) {
                shelf.books = shelf.books.concat(data);
                shelf.lastPageLoaded = page;
                updateShelf(shelf);
            })
            .error(function (data, status, headers, config) {
                $scope.error = Errors.FAILED_LOAD_BOOKS;
            });
    }

    function loadShelves() {

        bookService.getShelves()
            .success(function (data, status, headers, config) {
                setupShelves(data);
                // Then also for each shelf, queue up a request to get
                // all the books and store it once it comes.
                data.forEach(function (shelf) {
                    // Get the first page only
                    loadBooksForShelf(shelf, 1);
                }, this);
            })
            .error(function (data, status, headers, config) {
                $scope.error = Errors.FAILED_LOAD_SHELVES;
            });
    }

    function getCurrentShelf() {
        if ($scope.shelves === undefined) {
            return [];
        }
        return getShelfById($scope.shelves.selectedShelfId);
    }
    
    function getShelfById(shelfId) {
        var foundShelf = null;
        $scope.shelves.forEach(function (shelf) {
            if (shelf.id === shelfId) {
                foundShelf = shelf;
            }
        }, this);
        return foundShelf;
    }

    $scope.getCurrentShelf = getCurrentShelf;
    $scope.loadBooksForShelf = loadBooksForShelf;

    loadShelves();

}]);
