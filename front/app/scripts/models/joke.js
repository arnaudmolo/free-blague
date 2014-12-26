/**
* @module Joke.model
* @exports Class Joke
*/

import { Model } from 'Backbone';

export default class Joke extends Model {

  /**
   * Set defaults values for a Joke.
   *
   * @return {Object} The default's jokes attributes.
   */

  initialize(options) {
    super(options);
    this.set('added', Date.now());
  }

  defaults() {
    return {
      id: 0,
      content: ''
    };
  }

  toString() {
    return this.get('content');
  }

}
