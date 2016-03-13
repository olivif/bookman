const router = require('express').Router();

router.get('/',
    function (req, res) {
        res.render('index');
    });

router.get('/partials/:name',
    function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

module.exports = router;