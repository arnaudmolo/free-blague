module.exports = function(app){
  var dataSource, Joke;

  dataSource = app.dataSource('db', {adapter: 'memory'});

  Joke = dataSource.models.joke;

  createJoke = function(){
    return Joke.create({
      "title": "title",
      "content": "content",
      "date": new Date
    });
  };

  for (var i = 0; i < 100; i++) {
     createJoke();
  };

};
