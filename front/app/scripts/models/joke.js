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

      var self;

      self = this;

      api.updateJoke(this)
        .then(function(res){
          self.set('voted', 2);
          self.set(res.joke);
        });
    };
  }

  toString() {
    return this.get('content');
  }

}

module.exports = Joke;
