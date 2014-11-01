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
      voted: false
    };
  }

  vote() {
    if (!this.get('voted')) {

      var self;

      self = this;

      api.updateJoke(this)
        .then(function(res){
          console.log(res);
          self.set('voted', true)
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
