var createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan');

// set routers
var indexRouter = require('./routes/index'),
    episodeRouter = require('./routes/episode'),
    locationRouter = require('./routes/location'),
    dimensionRouter = require('./routes/dimension'),
    plumbusRouter = require('./routes/plumbus');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// register middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set host paths for static content
app.use(express.static(path.join(__dirname, 'public')));
app.use('*/images', express.static(path.join(__dirname, 'public/images')));
app.use('*/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('*/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));

// register routes
app.use('/', indexRouter);
app.use('/episode', episodeRouter);
app.use('/location', locationRouter);
app.use('/dimension', dimensionRouter);
app.use('/plumbus', plumbusRouter);

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
