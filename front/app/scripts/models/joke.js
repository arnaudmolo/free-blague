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

  initialize(options) {
    super(options);
    this.set('added', Date.now());
    this.on('change', function(){
      console.log('initialize onchange');
    })
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

  hasChanged() {
    console.log('hasChanged');
  }

}

module.exports = Joke;
