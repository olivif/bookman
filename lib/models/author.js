
function createAuthor(goodreadsAuthor) {

    var a = goodreadsAuthor;

    var author = {};
    author.rating = parseFloat(a.average_rating[0]);
    author.id = parseInt(a.id[0]);
    author.thumb = a.image_url[0];
    author.name = a.name[0];

    return author;
}

module.exports = createAuthor;