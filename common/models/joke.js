module.exports = function(Joke){

  Joke.definition.properties.date.default   = Date.now;

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

  Joke.beforeValidate = function(next, joke){
    // joke.geo = geoip.lookup(global.req.headers.host.split(':')[0]);
    next();
  };

};
