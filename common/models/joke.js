'use strict';

module.exports = function(Joke){

  Joke.definition.properties.date.default   = Date.now;
  Joke.definition.properties.random.default = Math.random;

  Joke.random = function(cb) {

    Joke.count(function(err, res){
      var rand;
      rand = Math.floor(Math.round(Math.random() * res));
      Joke.findOne({skip: rand}, function(err, res){
        cb(null, res);
      });
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
