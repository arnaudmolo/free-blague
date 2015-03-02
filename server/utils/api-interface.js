
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

    return new Promise(function(resolve, reject) {
      Joke.random(lang, function callback(err, res) {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      })
    });
  },

  getLanguageDefinition(lang) {
    return new Promise(function(res, rej) {
      res(require('./../../traductions/' + lang + '.json'));
    });
  }

}));
