module.exports = function(Joke){

  Joke.random = function(cb) {

    Joke.count(function(err, res){

      Joke.findById(Math.round(Math.random() * res), function(err, res){

        cb(null, res);

      });

    });

  };

  Joke.remoteMethod(
      'random',
      {
        returns: {arg: 'joke', type: 'string'}
      }
  );
};
