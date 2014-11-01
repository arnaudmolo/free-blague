/**
* @module Joke.model
* @exports Class Joke
*/

import Backbone from 'backbone';
import api      from './../api';

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
  }

  defaults() {
    return {
      id: 0,
      content: '',
      voted: 0
    };
  }

  vote() {

    if (this.get('voted') === 'up' || this.get('voted') === 'down') {

      api.updateJoke(this)
        .then((res) => {
          this.set('voted', 2);
          this.set(res.joke);
        });
    };
  }

  hasChanged() {
    console.log('hasChanged');
  }

  toString() {
    return this.get('content');
  }

}

module.exports = Joke;
