module.exports = function(Joke){

  Joke.definition.properties.date.default = Date.now;
  Joke.definition.properties.positiv.default = 0;
  Joke.definition.properties.negativ.default = 0;

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

  Joke.vote = function(vote, jokeId, cb) {
    Joke.findOne({
      where: {
        id: jokeId
      }
    }, function(err, joke){
      if (vote) {
        ++joke.positiv;
      }else{
        ++joke.negativ;
      }
      joke.save(cb);
    })
  };

  Joke.remoteMethod(
      'vote',
      {
        accepts: [
          {
            arg: 'vote',
            type: 'boolean'
          }, {
            arg: 'jokeId',
            type: 'string'
          }],
        http: {
          verb: 'get'
        }
      }
  );

  // Joke.beforeValidate = function(next, joke){
  //   // joke.geo = geoip.lookup(global.req.headers.host.split(':')[0]);
  //   next();
  // };

};
