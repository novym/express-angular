var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

//===== View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//===== Middleware
// server activity logging
app.use(logger('dev'));

// parse json in requests to the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup public paths
app.use(express.static(path.resolve(__dirname, 'public')));

//===== Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//===== Error Handlers
// development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Get port from environment and store in Express
var port = process.env.PORT || '3000';
app.set('port', port);

// Event listener for HTTP server "error" event

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' process is already running on this port - if this is unexpected you might have a lingering node process try killing it try again');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//===== Start Server
var server = app.listen(port, function() {
    var port = app.get('port');
    var envMode = app.get('env');
    console.log('Starting '+envMode+' server is listening on http://localhost:'+port);
});
app.on('error', onError);

module.exports = server;
