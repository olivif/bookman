
function createShelf(goodreadsShelf) {
    var shelf = {};
    shelf.id = goodreadsShelf.id[0];
    shelf.name = goodreadsShelf.name[0];
    shelf.bookCount = goodreadsShelf.book_count[0];
    
    return shelf;
}

module.exports = createShelf;