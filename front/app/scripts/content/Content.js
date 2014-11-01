/**
* @module Joke.model
* @exports Instance of User
*/

import Backbone from 'backbone';

import JokeList from './../models/joke-list';
import api      from './../api';
import say      from './../say';

var { Model } = Backbone;

/**
 * @class Content
 * Extended from Backbone Model
 * Contains the Content informations
 */

class Content extends Model {

  initialize() {

    this.mute(localStorage.getItem('muted') === 'true');

    return;
  }

  mute(muted) {

    localStorage.setItem('muted', muted);

    this.set('mute', muted);

    if (!muted) {
      return this.randomizeRequest();
    }

    while(speechSynthesis.speaking){
      speechSynthesis.cancel();
    }

    clearTimeout(this.timeout);

    return;
  }

  randomizeRequest() {

    api
      .getRandomJoke()
      .then((res) => {
        say(res.content);
        return res
      })
      .then((res) => {
        this.get('jokes').add(res);
      });

    this.timeout = setTimeout(() => {
      this.randomizeRequest.call(this);
    }, 30000);
  }

  defaults() {
    return {
      mute : false,
      jokes: new JokeList()
    };
  }

}

module.exports = new Content();
