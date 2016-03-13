const router = require('express').Router();

const userStore = require('./../lib/userStore');

// Goodreads api
const goodreadsApi = require('./../lib/goodreadsApi');
const goodreadsApiConvertor = require('./../lib/goodreadsApiConvertor');

// Models
const shelf = require('./../lib/models/shelf');
const book = require('./../lib/models/book');

router.get('/shelves',
    function (req, res) {
        goodreadsApi.getShelves(
            userStore.user.id,
            function (goodreadsData) {
                res.json(goodreadsApiConvertor(goodreadsData, shelf));
            });
    });

router.get('/books/:shelf/:page/:perPage',
    function (req, res) {
        goodreadsApi.getBooksForShelf(
            userStore.user.id,
            req.params.shelf,
            req.params.page,
            req.params.perPage,
            function (goodreadsData) {
                res.json(goodreadsApiConvertor(goodreadsData, book));
            });
    });

router.get('/author/:authorId/books/:page',
    function (req, res) {
        goodreadsApi.getAuthorBooks(
            req.params.authorId,
            req.params.page,
            function (goodreadsData) {
                res.json(goodreadsApiConvertor(goodreadsData, book));
            });
    });

module.exports = router;