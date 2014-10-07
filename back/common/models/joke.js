'use strict';

var geoip;

geoip = require('geoip-lite');

module.exports = function(Joke){

  Joke.definition.properties.date.default   = Date.now;
  Joke.definition.properties.random.default = Math.random;

  Joke.random = function(cb) {
    var rand;
    rand = Math.random();

    Joke.findOne({
      where: {
        random: {
          lte: rand
        }
      }
    }, function(err, res) {

      console.log(rand);

      if (res === null) {
        Joke.findOne({
          where: {
            random: {
              gte: rand
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

  Joke.beforeValidate = function(next, joke){
    joke.geo = geoip.lookup(global.req.headers.host.split(':')[0]);
    next();
  };

};
