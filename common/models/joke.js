export default function(Joke){

  Joke.definition.properties.date.default = Date.now;
  Joke.definition.properties.positiv.default = 0;
  Joke.definition.properties.negativ.default = 0;

  Object.assign(Joke, {
    random(lang, cb) {
      console.log(lang);
      Joke.count({language: lang}, function(err, res){
        let rand;
        rand = Math.floor(Math.round(Math.random() * (res - 1)));
        if (res === 0) {
          let e = new Error('No joke found');
          e.name = "No joke found";
          e.status = 404;
          return cb(e, null);
        };
        Joke.findOne({where: {language: lang}, skip: rand}, cb);
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

  });

  Joke.remoteMethod(
      'random',
      {
        accepts: [{
          arg: 'lang',
          type: 'string',
          required: true
        }],
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
