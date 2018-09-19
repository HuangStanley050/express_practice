var createError = require('http-errors');
var express = require('express');
var methodOverride = require('method-override')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
const mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require("./routes/article");
var editPage = require("./routes/edit");
var showRouter = require("./routes/show");
var deleteRouter = require("./routes/delete");


mongoose.connect("mongodb://admin:test1234@ds257372.mlab.com:57372/simple_databse", { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("connected to database");
});
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/add', articleRouter);
app.use("/articles", showRouter);
app.use("/article/edit", editPage);
app.use("/article/delete", deleteRouter);
app.use('/users', usersRouter);

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
