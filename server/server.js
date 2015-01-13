import loopback from 'loopback';
import boot from 'loopback-boot';
import monorouterModdleware from 'connect-monorouter';

var app, path;

app = loopback();

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --
app.use(function(req, res, next){
  global.req = req;
  next();
});

// boot scripts mount components like REST API
boot(app, __dirname);

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
path = require('path');
app.use(monorouterModdleware(require('./router')(app)));
app.use(loopback.static(path.resolve(__dirname, '../client')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('json spaces', 2); //pretty print json responses

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

require('./create-test-data')(app);

// Use cookies for authentification
app.use(loopback.token({model: app.models.accessToken}));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

app.start();

export default app;
