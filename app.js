// Express 
var express = require('express');
var errorHandler = require('express-error-handler');
var session = require('express-session')
var http = require('http');
var path = require('path');

// Use dependencies
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Env
var dotenv = require('dotenv');
dotenv.load();

// Api
var routes = require('./routes');
var api = require('./routes/api');

// Auth 
var passport = require('passport');
var GoodreadsStrategy = require('passport-goodreads').Strategy;
var userStore = require('./lib/userStore');

function configurePassport() {
    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.  However, since this example does not
    //   have a database of user records, the complete Goodreads profile is
    //   serialized and deserialized.
    passport.serializeUser(function(user, done) {
    done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
    done(null, obj);
    });

    // Use the GoodreadsStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a token, tokenSecret, and Goodreads profile), and
    //   invoke a callback with a user object.
    passport.use(new GoodreadsStrategy({
        consumerKey: process.env.GOODREADS_KEY,
        consumerSecret: process.env.GOODREADS_SECRET,
        callbackURL: "/goodreads/callback"
    },
    function(token, tokenSecret, profile, done) {
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


var app = express();

configureApp();
configureSession();
configureMiddleware();
configureErrorHandling();
configureRoutes();
startServer();

function configureApp() {
    // Configuration
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
}

function configureSession() {
    app.use(session({ 
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true 
        }));
    // Initialize Passport!  Also use passport.session() middleware, to support 
    // persistent login sessions (recommended). 
    app.use(passport.initialize()); 
    app.use(passport.session()); 
}

function configureMiddleware() {
    //CORS middleware
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });
}

function configureErrorHandling() {
    var env = process.env.NODE_ENV || 'development';

    // development only
    if (env === 'development') {
    app.use(errorHandler());
    }

    // production only
    if (env === 'production') {
    // TODO
    }
}

function configureRoutes() {
    
    // Routes
    // serve index and view partials
    app.get('/', routes.index);
    app.get('/partials/:name', routes.partials);

    // Api
    app.get('/api/name', api.name);
    app.get('/goodreads',
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
    app.get('/goodreads/callback',
        passport.authenticate('goodreads', { failureRedirect: '/login' }),
        function (req, res) {
            console.log("Got callback from goodreads");
            console.log(req.user);
            userStore.storeGoodreadsUser(req.user);
            res.redirect('/home');
        });

    app.get('/user/name', function (req, res) {
    res.send(userStore.user.name);
    });

    // Redirect all others to the index (HTML5 history)
    app.get('*', routes.index);
}

function startServer() {
    
    var server = http.createServer(app);
    var port = app.get('port');
    
    server.listen(port, function () {
        console.log('Express server listening on port ' + port);
    });
}

module.exports = app;