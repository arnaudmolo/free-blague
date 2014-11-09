/**
* @module Joke.list
* @exports Class JokeList
*/

import Backbone from 'backbone';

import Joke     from './joke';

var { Collection } = Backbone;

/**
 * @class JokeList
 * Extended from Backbone Collection
 * Contains the User jokes
 */

class JokeList extends Collection {

  /**
   * Creates an instance of Collection.
   * Bind the Joke model to the collection.
   *
   * @constructor
   * @this {JokeCollection}
   * @param {Object} @see Backbone Collection params
   */

  initialize(options) {
    super(options);
    this.on('change', function(joke){
      if (this.at(this.length - 1) === joke) {
        joke.vote();
      }
    });
  }

  get model() {
    return Joke;
  }

}

module.exports = JokeList;
