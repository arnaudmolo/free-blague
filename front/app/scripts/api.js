/**
* @module API
* @exports {static class} API
*/

import Promise from 'bluebird';

import http from './requester';

var API_URL, TWO_WEEKS;

TWO_WEEKS = 1000 * 60 * 60 * 24 * 7 * 2;

API_URL = 'http://' + "arnaudmolo-blague.nodejitsu.com" + '/api';
API_URL = 'http://' + '127.0.0.1:3000' + '/api';

function access(token){
  if (!token) {
    console.error('no token');
  };
  return '?access_token=' + token;
}

/**
 * @class API
 * Deal with the API
 */

export default new class API {

  /**
   * Get a random Joke from the server
   *
   * @return {Promise}(joke)
   */

  getRandomJoke() {
    return http.get(API_URL + '/jokes/random')
      .then(function(res){
        if (res.joke !== null) {
          return res.joke;
        }
        throw new Error('No jokes provided by the API');
      });
  }

  /**
   * Save the joke
   *
   * @return {Promise}(joke)
   */

  saveJoke(joke) {

    var user, promise;

    // user = require('./models/user');
    joke = JSON.stringify(
      {
        content: joke,
        date: new Date(),
        language: navigator.language || 'unknown'
      }
    );

    if (user.get('logged')) {
      promise = http
        .post(API_URL +
            '/users/' +
            user.get('userId') +
            '/jokes' +
            access(),
          joke);
    } else {
      promise = http
        .post(API_URL + '/jokes', joke);
    }

    return promise;

  }

  updateJoke(joke) {

    var voted;

    voted = joke.get('voted') === 'up';

    return http.get(API_URL + '/Jokes/vote?=' + voted + '?jokeId=' + joke.get('id'));

  }

  /**
   * Create the user
   *
   * @return {Promise}(userId)
   */

  createUser(user) {

    var promise;

    promise = http.post(API_URL + '/users', JSON.stringify(user));

    return promise;
  }

  /**
   * Auth the user.
   * Update the TTL.
   *
   * @return {Promise}(AccessToken)
   */

  loginUser(user) {

    var promise;

    user.ttl = TWO_WEEKS;

    promise = http
      .post(API_URL + '/users/login', JSON.stringify(user));

    return promise;
  }

  /**
   * Get user's jokes
   *
   * @return {Promise}(jokes)
   */

  getUserJokes(id, token){

    var promise;

    promise = http.get(API_URL + '/users/' + id + '/jokes' + access(token));

    return promise;
  }

  logout(token) {
    return http.post(API_URL + '/users/logout' + access(token), {});
  }

};
