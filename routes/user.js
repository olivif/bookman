var router = require("express").Router();
var userStore = require('./../lib/userStore');

router.get('/name',
    function (req, res) {
        res.send(userStore.user.name);
    });

module.exports = router;