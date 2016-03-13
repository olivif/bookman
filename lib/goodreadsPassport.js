const passport = require('passport');
const GoodreadsStrategy = require('passport-goodreads').Strategy;

function configurePassport() {
    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.  However, since this example does not
    //   have a database of user records, the complete Goodreads profile is
    //   serialized and deserialized.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    // Use the GoodreadsStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a token, tokenSecret, and Goodreads profile), and
    //   invoke a callback with a user object.
    passport.use(new GoodreadsStrategy({
        consumerKey: process.env.GOODREADS_KEY,
        consumerSecret: process.env.GOODREADS_SECRET,
        callbackURL: '/goodreads/callback'
    },
        function (token, tokenSecret, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // To keep the example simple, the user's Goodreads profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Goodreads account with a user record in your database,
                // and return that user instead.
                return done(null, profile);
            });
        }
        ));
}

configurePassport();

module.exports = passport;