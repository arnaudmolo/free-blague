/**
* @module Joke.model
* @exports Class Joke
*/

import Backbone from 'backbone';

var { Model } = Backbone;

class Joke extends Model {

  /**
   * Set defaults values for a Joke.
   *
   * @return {Object} The default's jokes attributes.
   */

  defaults() {
    return {
      id: 0,
      content: ''
    };
  }
}

module.exports = Joke;
