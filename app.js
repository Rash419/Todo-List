var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');



//mongodb+srv://admin:<password>@cluster0.inyjd.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority
var mongoDB = 'mongodb+srv://admin:admin123@cluster0.inyjd.gcp.mongodb.net/TodoList?retryWrites=true&w=majority'
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.use(compression());
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', indexRouter);
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
