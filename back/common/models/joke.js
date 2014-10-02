module.exports = function(Joke){

  Joke.random = function(cb) {

    Joke.count(function(err, res){

      console.log(Math.round(Math.random() * res));

      Joke.findById(Math.round(Math.random() * res), function(err, res){
        console.log(res);
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

  /********************************/
  /********  Validations  *********/
  /********************************/

  Joke.beforeSave = function(next, joke){
    joke.date = new Date;
    joke.random = Math.random();
    next();
    return undefined
  }

};
