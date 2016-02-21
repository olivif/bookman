
function createBook(goodreadsBook) {
    
    var b = goodreadsBook.book[0];

    var book = {};
    book.id = b.id[0];
    book.title = b.title[0];
    book.thumb = b.image_url[0];

    // book.author = b.authors[0];
    // book.description = b.description[0];
    
    return book;
}

module.exports = createBook;