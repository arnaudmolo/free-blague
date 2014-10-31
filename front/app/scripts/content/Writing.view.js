/** @jsx React.DOM */

/**
 * @module Writing.view
 * @exports {ReactClass}Writing
 */

import React from 'react/addons';

import BaseClass   from './../utils/react-class';
import cleanString from './../utils/clean-string';
import User        from './../models/user';
import say         from './../say';
import Backbone    from 'backbone';

var Events;

Events = Backbone.Events;

class Writing {

  close() {
    Events.trigger('close');
  }

  handleSubmit(event) {

    var jokeDom;

    jokeDom = this.refs.joke.getDOMNode();

    event.preventDefault();

    User
      .createJoke(cleanString(jokeDom.value))
      .then(function(res){
        jokeDom.value = '';
        say(res.content);
        Events.trigger('joke:registered');
      });
  }

  render() {

    return (
        <div className="writing" key={0} transitions={true}>
          <div className="close" onClick={this.close}>
            <span>x</span>
          </div>
          <form onSubmit={this.handleSubmit} >
            <textarea
              ref="joke"
              rows="5"
              placeholder="Write your joke..."></textarea>
            <button
              type="submit"
              className="button red publish" > Publish my joke
            </button>
          </form>
        </div>
    );
  }

}

module.exports = React.createClass(Writing.prototype);
