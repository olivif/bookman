// Express
const express = require('express');
const errorHandler = require('express-error-handler');
const session = require('express-session');
const http = require('http');
const path = require('path');

// Use dependencies
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Env
const dotenv = require('dotenv');
dotenv.load();

// Api
const routeIndex = require('./routes/index');
const routeUser = require('./routes/user');
const routeGoodreads = require('./routes/goodreads');
const routeApi = require('./routes/api');

// Auth
const passport = require('./lib/goodreadsPassport');
const userStore = require('./lib/userStore');

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
        saveUninitialized: true,
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
        res.header(
            'Access-Control-Allow-Headers',
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });
}

function configureErrorHandling() {
    var env = process.env.NODE_ENV || 'development';

    if (env === 'development') {
        app.use(errorHandler());
    }
}

function configureRoutes() {

    app.use('/', routeIndex);
    app.use('/user', routeUser);
    app.use('/goodreads', routeGoodreads);
    app.use('/api', routeApi);

    // Redirect all others to the index (HTML5 history)
    app.get('*', function (req, res) {
        res.render('index');
    });
}

function startServer() {

    var server = http.createServer(app);
    var port = app.get('port');

    server.listen(port, function () {
        console.log('Express server listening on port ' + port);
    });
}

var app = express();

configureApp();
configureSession();
configureMiddleware();
configureErrorHandling();
configureRoutes();
startServer();

module.exports = app;