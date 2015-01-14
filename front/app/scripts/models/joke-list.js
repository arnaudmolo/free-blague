/**
* @module Joke.list
* @exports Class JokeList
*/

import { Collection } from 'backbone';

import Joke from './joke';

/**
 * @class JokeList
 * Extended from Backbone Collection
 * Contains the User jokes
 */

export default class JokeList extends Collection {

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
    this.model = Joke;
  }

  dispatchCallback(payload) {

    switch (payload.actionType) {

      case 'add-remove':
        return this.remove(payload.joke);

      case 'add-joke':
        return this.add(joke);

    }

  }

}
