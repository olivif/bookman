const htmlToTextConverter = require('html2plaintext');
const author = require('./author');

function createBook(goodreadsBook) {

    var b = goodreadsBook;
    if (goodreadsBook.book !== undefined) {
        b = goodreadsBook.book[0];
    }

    var book = {};
    book.isbn = b.isbn[0];
    book.isbn13 = b.isbn13[0];
    book.id = b.id[0];
    book.author = author(b.authors[0].author[0]);
    book.title = b.title[0];
    book.description = htmlToTextConverter(b.description[0]);
    book.thumb = b.image_url[0];

    // todo hack to large thumbs here by replacing m with l in the url

    return book;
}

module.exports = createBook;