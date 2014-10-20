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
      jokes: new JokeList([
  {
    content: "joke1",
    date: "2014-10-18T13:02:00.111Z",
    id: 1,
    userId: 1
  }, {
    content: "joke2",
    date: "2014-10-18T13:02:00.111Z",
    id: 2,
    userId: 1
  }, {
    content: "Encore une super vanne",
    date: "2014-10-18T16:58:28.347Z",
    id: 4,
    userId: 1
  }, {
    content: "hahaha haha hahaha on se tape des barres",
    date: "2014-10-18T16:59:20.176Z",
    id: 6,
    userId: 1
  }, {
    content: "hahaha haha hahaha",
    date: "2014-10-18T16:59:38.888Z",
    id: 7,
    userId: 1
  }, {
    content: "hein",
    date: "2014-10-18T17:00:10.193Z",
    id: 9,
    userId: 1
  }, {
    content: "Je sais pas ce qu'il c'est passé, c'était chelou",
    date: "2014-10-18T17:00:22.712Z",
    id: 10,
    userId: 1
  }
]
)
    };
  }

}

module.exports = new Content();
