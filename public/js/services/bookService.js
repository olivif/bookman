// Book service
app.factory('bookService', ["$http", function ($http) {
    var instance = {};

    function getMockBooks(numberOfBooks, prefix) {
        var books = [];
        
        // Generate sample book
        var sampleBook = {};
        sampleBook.title = prefix + "Sample book";
        sampleBook.description = "I am so interesting you will want to read me.";
        sampleBook.author = "John Smith";
        sampleBook.thumb = "http://placehold.it/150x200";
        
        for (var bookIdx = 0; bookIdx < numberOfBooks; bookIdx++) {
            sampleBook.id = bookIdx;
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
    
    instance.getShelves = function() {
        return $http({
            method: 'GET',
            url: '/api/shelves'
        });
    }
    
    instance.getBooks = function(shelf) {
        return $http({
            method: 'GET',
            url: '/api/books/' + shelf
        });
    }
    
    return instance;
}]);