'use strict';
var atomic = require('../../bower_components/atomic/dist/atomic')(window);
var API_URL = 'http://' + require('./api.json') + ':3000';

module.exports = {
  getRandomJoke: function(){
    return atomic.get(API_URL + '/api/Joke/random');
  },
  saveJoke: function(string){

    var joke = ({
      'content': string,
      'date': Date.now().toString()
    });

    return atomic.post(API_URL + '/api/joke', joke)
  }
};
