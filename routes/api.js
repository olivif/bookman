var router = require("express").Router();
var userStore = require('./../lib/userStore');
var goodreadsApi = require('./../lib/goodreadsApi');

router.get('/shelves',
    function (req, res) {
        goodreadsApi.getShelves(userStore.user.id, function (results) {
            res.json(results);
        });
    });

router.get('/books/:shelf',
    function (req, res) {
        goodreadsApi.getBooksForShelf(userStore.user.id, req.params.shelf, function (results) {
            res.json(results);
        });
    });
    
module.exports = router;