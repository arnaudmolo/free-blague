
import http     from './requester';
import Promise  from 'bluebird';

var API_URL, TWO_WEEKS, access;

TWO_WEEKS = 1000 * 60 * 60 * 24 * 7 * 2;

// API_URL = 'http://' + "arnaudmolo-blague.nodejitsu.com" + '/api';
API_URL = 'http://' + '127.0.0.1:3000' + '/api';

access = function(tocken = require('./models/user').get('id')){
  return '?access_token=' + tocken;
};

module.exports = {
  getRandomJoke: function(){
    return http.get(API_URL + '/jokes/random')
      .then(function(res){return res.joke.content;});
  },
  saveJoke: function(joke){
    return http
      .post(API_URL +
        '/users/' +
        require('./models/user').get('userId') +
        '/jokes' +
        access(),
      JSON.stringify({content: joke, date: new Date()}))
      .then(function(res){return res.content;});
  },
  createUser: function(user){

    var promise;

    promise = http.post(API_URL + '/users', JSON.stringify(user));

    return promise;
  },
  loginUser: function(user){

    var promise;

    user.ttl = TWO_WEEKS;

    promise = http
      .post(API_URL + '/users/login', JSON.stringify(user));

    return promise;

  },
  getUserJokes: function(id, tocken){

    var promise;

    promise = http.get(API_URL + '/users/' + id + '/jokes' + access(tocken));

    promise
      .then(function(res){
        console.log('getUserJokes');
        return res;
      });
    return promise;
  }
};
