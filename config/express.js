var config = require('./config'),
express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');

module.exports = function() {
    var app = express();
    if (process.env.NODE_ENV === 'dev') {
      app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'prod') {
      app.use(compress());
    }
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    app.use(session({
       saveUninitialized: true,
       resave: true,
       secret: config.sessionSecret
    }));
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    require('../app/routes/index.server.routes.js')(app);
    
    app.use(express.static('./public'));
    
    return app;
};