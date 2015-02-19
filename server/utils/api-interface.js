
/**
* @module API
* @exports {static class} API
*/

/**
 * @class API
 * Deal with the API
 */

import loopback from 'loopback';
import Promise from 'bluebird';

let Joke = loopback.getModel('Joke');

export default Object.freeze(Object.assign({}, {

  /**
   * Get a random Joke from the server
   *
   * @return {Promise}(joke)
   */

  getRandomJoke(lang) {

    return new Promise(function(resolve, rej) {
      Joke.random(lang, function callback(err, res) {
        if (err) {
          return rej(err);
        }
        return resolve(res);
      })
    });
  },

  /*
   * Be careful : for the moment, only getRandomJoke & getLanuageDefinition are rightly interfaced @TODO
   */

  /**
   * Save the joke
   *
   * @return {Promise}(joke)
   */

  saveJoke(joke, user) {

    joke = JSON.stringify(
      {
        content: joke,
        date: new Date(),
        language: navigator.language || 'unknown',
        subscriberId: user.id
      }
    );

    return http
      .post(API_URL + '/jokes', joke);

  },

  updateJoke(jokeId, voted) {
    return http.get(API_URL + '/Jokes/vote?=' + voted + '?jokeId=' + jokeId);
  },

  /**
   * Create the user
   *
   * @return {Promise}(userId)
   */

  createUser(user) {
    return http.post(API_URL + '/users', JSON.stringify(user));
  },

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
  },

  /**
   * Get user's jokes
   *
   * @return {Promise}(jokes)
   */

  getUserJokes(id, token){
    return http.get(API_URL + '/users/' + id + '/jokes' + access(token));
  },

  logout(token) {
    return http.post(API_URL + '/users/logout' + access(token), {});
  },

  saveMail(email) {
    return http.post(API_URL + '/Subscribers', {email});
  },

  newsletterSubscription(email, joke) {

    let promise;

    promise = this
      .saveMail(email);

    if (joke) {
      promise = promise
        .then( (subscriber) => {
          return this
            .saveJoke(joke, subscriber);
          }
        );
    }

    return promise;

  },

  getLanguageDefinition(lang) {
    return new Promise(function(res, rej) {
      res(require('./../../traductions/' + lang + '.json'));
    });
  }

}));
