var http = require('http');
var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");

var expressSession = require("express-session");
var expressValidator = require("express-validator");
var flash = require('connect-flash');
var expressHandlebars = require("express-handlebars");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;


var app = express();

var routes = require('./routes/index');
var node_routes = require('./routes/index1');
var db = require("./database/db");

//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
app.use(passport.session());


app.use(expressSession({
  secret: "secret",
  saveUninitialized : true,
  resave: true
}));

app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});



app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept");
  next();
});

app.use(cors());

app.use('/', routes);
//app.use('/node-router', node_routes);



var raw_port = process.env.PORT;
var port = normalizePort(raw_port || '1000');
app.set('port', port);
var server = app.listen(port, function () {
  console.log('Server running at http://localhost:' + port);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

