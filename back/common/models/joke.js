// var geoip = require('geoip-lite');
var loopback = require('loopback');

module.exports = function(Joke){

  Joke.definition.properties.date.default   = Date.now;
  Joke.definition.properties.random.default = Math.random;

  Joke.random = function(cb) {
    var rand;

    console.log('this', loopback.getCurrentContext);

    rand = Math.random();

    Joke.findOne({
      where: {
        random: {
          gte: rand
        }
      }
    }, function(err, res) {
      if (res === null) {
        Joke.findOne({
          where: {
            random: {
              lte: rand
            }
          }
        }, function(err, res) {
          cb(null, res);
        });
        return;
      }
      cb(null, res);
    });

  };

  Joke.remoteMethod(
      'random',
      {
        returns: {
          arg: 'joke', type: 'string'
        },
        http: {
          verb: 'get'
        }
      }
  );

};
