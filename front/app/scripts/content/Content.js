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

    console.log('la on est bon', localStorage.getItem('muted') === 'true');

  }

  mute(mute) {

    localStorage.setItem('muted', mute);

    this.set('mute', mute);

    if (!mute) {
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
    }, 1000);
  }

  defaults() {
    return {
      mute : false,
      jokes: new JokeList()
    }
  }

}

module.exports = new Content();
