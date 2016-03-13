const router = require('express').Router();
const userStore = require('./../lib/userStore');

router.get('/name',
    function (req, res) {
        res.send(userStore.user.name);
    });

module.exports = router;