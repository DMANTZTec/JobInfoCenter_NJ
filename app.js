var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var loginSuccess = require('./routes/loginSuccess');
var search = require('./routes/search');
var home = require('./routes/home');
var logout = require('./routes/logout');
var adbanner = require('./public/javascripts/adbanner');
var mysql      = require('mysql');
var myconnection=require('express-myconnection');
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
global.document = new JSDOM('html').window.document;
var app = express();
var options = {
    host    : '10.0.0.3',
    port    : '3306',
    user    : 'shanti',
    password: 'secret',
    database: 'test'
};
app.use(myconnection(mysql,options,'single'));
var sessionStore = new MySQLStore(options);
app.use(session({
    secret: '2C44-4D44-W',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/search',search);
app.use('/home',home);
app.use('/login', login);
app.use('/logout', logout);
app.use('/loginSuccess', loginSuccess);
//app.use('/adbanner',adbanner);
//app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
