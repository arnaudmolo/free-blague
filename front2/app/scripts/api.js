'use strict';

var http, API_URL;

http    = require('./requester');
API_URL = 'http://' + "arnaudmolo-blague.nodejitsu.com" + '/api';

module.exports = {
  getRandomJoke: function(){
    return http.get(API_URL + '/Jokes/random')
      .then(function(res){return res.joke.content;});
  },
  saveJoke: function(joke){
    return http
      .post(API_URL + '/Jokes', JSON.stringify({content: joke}))
      .then(function(res){return res.content;});
  }
};
