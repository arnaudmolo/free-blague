/**
* @module Joke.model
* @exports Instance of Content
*/

import { Model } from 'backbone';

import JokeList from './../models/joke-list';
import api from './../api';
import say from './../utils/say';
import appDispatcher from './../dispatcher/appDispatcher';

/**
 * @class Content
 * Extended from Backbone Model
 * Contains the Content informations
 */

export default new class Content extends Model {

  initialize() {

    var tempJoke;

    tempJoke = this.getTempJoke();

    if (window) {
      console.log(window);
    };

    this.mute(localStorage.getItem('muted') === 'true');
    this.dispatchToken = appDispatcher.register(this.dispatchCallback.bind(this));

    if (tempJoke) {
      console.log('?');
      this.get('jokes').add({
        content: tempJoke
      });
      console.log(this.get('jokes').at(0));
    }

    return;
  }

  dispatchCallback(payload) {

    switch(payload.actionType) {
      case 'show-writing':
        this.set('showWriting', payload.value);
    }

  }

  getTempJoke() {

    if (window) {
      if (window.tempJoke) {
        return tempJoke;
      };
    };

    return undefined;
  }

  mute(muted) {

    var tempJoke;

    tempJoke = this.getTempJoke();

    localStorage.setItem('muted', muted);

    this.set('mute', muted);

    if (!muted && !tempJoke) {
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
      .then(say)
      .then((res) => {
        this.get('jokes').add({content: res});
      });

    this.timeout = setTimeout(() => {
      this.randomizeRequest();
    }, 30000);
  }

  defaults() {
    return {
      mute : false,
      showWriting: false,
      jokes: new JokeList()
    };
  }

};
