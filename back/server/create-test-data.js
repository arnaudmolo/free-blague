module.exports = function(app) {
  var dataSource, Joke, createJoke;

  dataSource = app.dataSource('db', {
    adapter: 'memory'
  });

  Joke = dataSource.models.Joke;

  createJoke = function() {
    return Joke.create({
      "content": "content",
      "random": Math.random(),
      "date": new Date
    });
  };

  // for (var i = 0; i < 100; i++) {
  //   createJoke();
  // };

};
