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
var routeIndex = require('./routes/index');
var routeUser = require('./routes/user');
var routeGoodreads = require('./routes/goodreads');
var routeApi = require('./routes/api');

// Auth 
var passport = require('./lib/goodreadsPassport');
var userStore = require('./lib/userStore');

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

    app.use('/', routeIndex);
    app.use('/user', routeUser);
    app.use("/goodreads", routeGoodreads);
    app.use("/api", routeApi);
    
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