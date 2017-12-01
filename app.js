var express = require('express');
var fs=require('fs');
//const log = require('simple-node-logger').createSimpleLogger();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var debug = require('node-inspector');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var Registration_form = require('./routes/registration');
var loginSuccess = require('./routes/loginSuccess');
var search = require('./routes/search');
var home = require('./routes/home');
var logout = require('./routes/logout');
var adbanner = require('./public/javascripts/adbanner');
var mysql      = require('mysql');
var myconnection=require('express-myconnection');
var rfs = require('rotating-file-stream');
var contact = require('./routes/contact');
var logDirectory = path.join(__dirname, 'log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    initialRotation:true,
    path: logDirectory
});
var app = express();
var options = {
    //host    : '10.0.0.6',
    host    : '192.168.100.2',
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
    saveUninitialized: false,
    rolling:true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(':date[clf] :method :url',{stream: accessLogStream}));
//app.use(logger('combined', {stream: accessLogStream}));
app.use(logger('dev',{
    skip: function (req, res) { return res.statusCode < 400 }
}));
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
app.use('/Registration_form',Registration_form);
app.use('/contactus', contact);
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
