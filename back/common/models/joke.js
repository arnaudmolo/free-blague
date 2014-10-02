module.exports = function(Joke){

  Joke.random = function(cb) {

    var rand = Math.random();

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

  /********************************/
  /********  Validations  *********/
  /********************************/

  // Joke.beforeValidate = function(next, joke){
  //   joke.date = new Date;
  //   joke.random = Math.random();
  //   console.log(joke, next);
  //   return next(next, joke);
  // }

};
