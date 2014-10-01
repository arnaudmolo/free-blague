'use strict';
var atomic = require('../../bower_components/atomic/dist/atomic')(window);
var API_URL = 'http://' + require('./api.json') + ':3000';

module.exports = {
  getRandomJoke: function(){
    return atomic.post(API_URL + '/api/joke/random');
  },
  saveJoke: function(string){

    var joke = ({
      'title': 'joke',
      'content': string,
      'date': Date.now().toString()
    });

    console.log(joke);

    return atomic.post(API_URL + '/api/joke', joke)
  }
};
