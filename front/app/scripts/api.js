
import http    from './requester';
import _       from 'lodash';
import Promise from 'bluebird';
import myJokes from './my-jokes';

var API_URL, TWO_WEEKS, localUser, access;

TWO_WEEKS = 1000 * 60 * 60 * 24 * 7 * 2;

// API_URL = 'http://' + "arnaudmolo-blague.nodejitsu.com" + '/api';
API_URL = 'http://' + '127.0.0.1:3000' + '/api';

access = function(){
  return '?access_token=' + localUser.id;
}

var exports = {
  getRandomJoke: function(){
    return http.get(API_URL + '/jokes/random')
      .then(function(res){return res.joke.content;});
  },
  saveJoke: function(joke){
    return http
      .post(API_URL + '/users/' + localUser.userId + '/jokes' + access(), JSON.stringify({content: joke, date: new Date}))
      .then(function(res){return res.content;});
  },
  createUser: function(user){
    return http
      .post(API_URL + '/users', JSON.stringify(user));
  },
  loginUser: function(user){

    var promise;

    if (user.id) {
      promise = new Promise(function(resolve, reject){
        localUser = user;
        resolve(user);
      })
    } else {
      user.ttl = TWO_WEEKS;

      promise = http
        .post(API_URL + '/users/login', JSON.stringify(user))
        .then(function(res){
          localUser = res;
          localStorage.setItem('user', JSON.stringify(localUser));
          console.log('logged', localUser);
          return res;
        });
    }

    promise.then(function(res){
      exports.getUserJokes();
      console.log("log");
      return res
    })

    return promise;

  },
  getUserJokes: function(){
    http.get(API_URL + '/users/' + localUser.userId + '/jokes' + access())
      .then(function(res){
        console.log('getUserJokes');
        myJokes.render(res);
        return res;
      })
  }
};

module.exports = exports;
