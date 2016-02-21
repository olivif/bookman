var router = require("express").Router();

var userStore = require('./../lib/userStore');

// Goodreads api
var goodreadsApi = require('./../lib/goodreadsApi');
var goodreadsApiConvertor = require('./../lib/goodreadsApiConvertor');

// Models
var shelf = require('./../lib/models/shelf');
var book = require('./../lib/models/book');


router.get('/shelves',
    function (req, res) {
        goodreadsApi.getShelves(userStore.user.id, function (goodreadsData) {
            res.json(goodreadsApiConvertor(goodreadsData, shelf));
        });
    });

router.get('/books/:shelf/:page/:perPage',
    function (req, res) {
        goodreadsApi.getBooksForShelf(userStore.user.id, req.params.shelf, req.params.page, req.params.perPage, function (goodreadsData) {
            res.json(goodreadsApiConvertor(goodreadsData, book));
        });
    });
    
module.exports = router;