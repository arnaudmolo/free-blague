/**
* @module Joke.model
* @exports Instance of User
*/

import { Model } from 'backbone';

import JokeList from './../models/joke-list';
import api      from './../api';
import say      from './../utils/say';

/**
 * @class Content
 * Extended from Backbone Model
 * Contains the Content informations
 */

export default new class Content extends Model {

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

    var self;

    self = this;

    api
      .getRandomJoke()
      .then(say)
      .then(function(res){
        self.get('jokes').add({content: res});
      });

    this.timeout = setTimeout(function(){
      self.randomizeRequest.call(self);
    }, 30000);
  }

  defaults() {
    return {
      mute : false,
      jokes: new JokeList()
    };
  }

}
