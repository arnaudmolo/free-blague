module.exports = function(app) {
  var dataSource, Joke, createJoke;

  dataSource = app.dataSource('db', {
    adapter: 'memory'
  });

  Joke = dataSource.models.Joke;

  createJoke = function() {
    console.log('??');
    return Joke.create({
      "content": "content",
    });
  };

  // for (var i = 0; i < 100; i++) {
  //   createJoke();
  // };

  // createJoke();

};
