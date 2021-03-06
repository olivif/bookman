var api = {};

const request = require('request');
const parseString = require('xml2js').parseString;

const apiBase = 'https://www.goodreads.com';

// https://www.goodreads.com/shelf/list.xml
// key:  Developer key (required).
// user_id:  Goodreads user id (required)
// page:  1-N (default 1)
api.getShelves = function (userId, callback) {

    // TOOD handle multiple pages?
    var params = {
        key: process.env.GOODREADS_KEY,
        user_id: userId,
        page: 1
    };

    var url = apiBase + '/shelf/list.xml';

    var requestOptions = { url: url, qs: params };

    request(requestOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {

                var unpackedResult = result.GoodreadsResponse.shelves[0].user_shelf;

                if (unpackedResult === null || unpackedResult === undefined) {
                    console.log('got undefined for shelves');
                    callback([]);
                } else {
                    callback(unpackedResult);
                    console.log(unpackedResult.length);
                }
            });
        }
    });
};

// https://www.goodreads.com/review/list?v=2
// v:  2
// id:  Goodreads id of the user
// shelf:  read, currently-reading, to-read, etc. (optional)
// sort:  title, author, cover, rating, year_pub, date_pub, date_pub_edition, date_started,
// date_read, date_updated, date_added, recommender, avg_rating, num_ratings, review, read_count,
// votes, random, comments, notes, isbn, isbn13, asin, num_pages, format, position, shelves,
// owned, date_purchased, purchase_location, condition (optional)
// search[query]:  query text to match against member's books (optional)
// order:  a, d (optional)
// page:  1-N (optional)
// per_page:  1-200 (optional)
// key:  Developer key (required).
api.getBooksForShelf = function (userId, shelfName, page, perPage, callback) {

    // TOOD handle multiple pages?
    var params = {
        v: 2,
        id: userId,
        shelf: shelfName,
        sort: 'date_read',
        order: 'd',
        page: page,
        per_page: perPage,
        key: process.env.GOODREADS_KEY,
    };

    var url = apiBase + '/review/list.xml';

    var requestOptions = { url: url, qs: params };

    request(requestOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {

                var unpackedResult = result.GoodreadsResponse.reviews[0].review;

                if (unpackedResult === null || unpackedResult === undefined) {
                    console.log('got undefined for books');
                    callback([]);
                } else {
                    callback(unpackedResult);
                    console.log(unpackedResult.length);
                }
            });
        }
    });
};

// Get an xml response with a paginated list of an authors books.
// URL: https://www.goodreads.com/author/list.xml    (sample url)
// HTTP method: GET
// Parameters:
// •key:  Developer key (required).
// •id:  Goodreads Author id (required)
// •page:  1-N (default 1)
api.getAuthorBooks = function (authorId, page, callback) {
    var params = {
        key: process.env.GOODREADS_KEY,
        id: authorId,
        page: page,
    };

    var url = apiBase + '/author/list.xml';

    var requestOptions = { url: url, qs: params };

    request(requestOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {

                var unpackedResult = result.GoodreadsResponse.author[0].books[0].book;

                if (unpackedResult === null || unpackedResult === undefined) {
                    console.log('got undefined for author books');
                    callback([]);
                } else {
                    callback(unpackedResult);
                    console.log(unpackedResult);
                }
            });
        }
    });
};

module.exports = api;