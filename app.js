var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var reactionRouter = require('./routes/reaction')
var shareRouter = require('./routes/share.routes');
var newsRouter = require('./routes/news.routes');
var postRouter = require('./routes/post.routes')

var subRouter = require('./routes/subscription')

const db = require('./models');
// const reaction = require('./models/reaction');

var app = express();

db.sequelize.sync(); //force:true

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/reaction',reactionRouter);
app.use('/share', shareRouter );
app.use('/news', newsRouter);
app.use('/post', postRouter);

app.use('/user', usersRouter);
app.use('/subscriptions',subRouter);
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
