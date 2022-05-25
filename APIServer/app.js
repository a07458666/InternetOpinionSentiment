var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const prom_client = require('prom-client');
const mongoose = require('mongoose');

var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongoose setup
mongoose.Promise = global.Promise;

// Prometheus setup
const register = prom_client.register;

prom_client.collectDefaultMetrics({register});

const INFO = new prom_client.Gauge({
  name: 'app_info',
  help: 'app info',
  labelNames: ['app_name', 'author', 'author_mail', 'description', 'version']
});
register.registerMetric(INFO);

INFO.labels({
  app_name: 'API Server',
  author: 'suyihao',
  author_mail: 'suyihao1999@gmail.com',
  description: 'api for search all record',
  version: '0.0.1'
}).set(1);

const requestCounter = new prom_client.Counter({
  name: 'http_request',
  help: 'http request counter',
  labelNames: ['method', 'path', 'statusCode'],
});
register.registerMetric(requestCounter);

app.use(function(req, res,next){
  res.on('finish', function(){
    requestCounter.labels({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode
    }).inc();
  });
  next();
});

// Setup server to Prometheus scrapes:
app.get('/metrics', async (req, res) => {
	try {
		res.set('Content-Type', register.contentType);
		res.end(await register.metrics());
	} catch (ex) {
		res.status(500).end(ex);
	}
});

// route
app.use('/', apiRouter);

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
