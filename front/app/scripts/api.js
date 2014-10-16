
import http     from './requester';
import _        from 'lodash';
import Promise  from 'bluebird';
import myJokes  from './my-jokes';
import domReady from './domReady';

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

    var promise;

    promise = http.post(API_URL + '/users', JSON.stringify(user));

    return promise;
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
        .post(API_URL + '/users/login', JSON.stringify(user));

      promise
        .then(function(res){
          return res;
        });
    }

    promise.then(function(res){

      var form;

      exports.getUserJokes();
      form = document.getElementById('login');
      form.parentNode.removeChild(form);

      form = document.getElementById('create-user');
      form.parentNode.removeChild(form);

      return res
    })

    return promise;

  },
  getUserJokes: function(){
    var promise = http.get(API_URL + '/users/' + localUser.userId + '/jokes' + access());

    promise
      .then(function(res){
        console.log('getUserJokes');
        myJokes.render(res);
        return res;
      })
  }
};

module.exports = exports;
