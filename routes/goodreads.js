var router = require("express").Router();
var passport = require('./../lib/goodreadsPassport');
var userStore = require('./../lib/userStore');

router.get('/',
    passport.authenticate('goodreads'),
    function (req, res) {
        // The request will be redirected to Goodreads for authentication, so this
        // function will not be called.
    });

// GET /auth/goodreads/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/callback',
    passport.authenticate('goodreads', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("Got callback from goodreads");
        console.log(req.user);
        userStore.storeGoodreadsUser(req.user);
        res.redirect('/home');
    });

module.exports = router; 
