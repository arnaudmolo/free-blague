'use strict';
var http    = require('./requester');
var API_URL = 'http://' + require('./api.json') + ':3000/api';

module.exports = {
  getRandomJoke: function(){
    return http.get(API_URL + '/Jokes/random')
      .then(function(res){return res.joke.content;});
  },
  saveJoke: function(string){
    var joke = ({
      content: string,
      date   : new Date,
      random : Math.random()
    });
    return http.post(API_URL + '/Jokes', JSON.stringify(joke))
      .then(function(res){
        return res.content;
      });
  }
};
