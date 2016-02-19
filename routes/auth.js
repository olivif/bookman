var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET /auth/goodreads
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Goodreads authentication will involve redirecting
//   the user to goodreads.com.  After authorization, Goodreads will redirect the user
//   back to this application at /auth/goodreads/callback
router.get('/goodreads',
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
router.get('/goodreads/callback',
    passport.authenticate('goodreads', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

module.exports = router;