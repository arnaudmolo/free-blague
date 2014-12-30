var fs            = require('fs');
var browserify    = require('browserify');
var reactify      = require('reactify');
var to5Browserify = require('6to5ify');
var envify        = require('envify');

module.exports = function(cb) {

  var stream = fs.createWriteStream('./main.js');

  stream.on('close', function(){
    cb();
    console.log('AZIUEGUYZAVBDLEIZUA FVUBU FYVBEZUFGYB');
  });

  browserify({debug: false})
    .transform(reactify)
    .transform(to5Browserify.configure({ modules: 'commonInterop', experimental: true}))
    .transform(envify)
    .require(__dirname + '/../front/app/scripts/components/content.js', { entry: true })
    .bundle()
    .pipe(stream);

}
