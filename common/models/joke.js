export default function(Joke){

  Joke.definition.properties.date.default = Date.now;
  Joke.definition.properties.positiv.default = 0;
  Joke.definition.properties.negativ.default = 0;

  Object.assign(Joke, {
    random(cb) {
      Joke.count(function(err, res){
        let rand;
        rand = Math.floor(Math.round(Math.random() * res));
        Joke.findOne({skip: rand}, function(err, res){
          cb(null, res);
        });
      });
    },

    vote(vote, jokeId, cb) {
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
      });
    }

  })

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
        returns: {
            arg: 'joke',
            type: 'Object'
        },
        http: {
          verb: 'get'
        }
      }
  );

};
