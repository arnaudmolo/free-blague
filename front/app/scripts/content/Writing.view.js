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

  getInitialState() {
    return {value: ''};
  }

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
        // jokeDom.value = '';
        say(res.content);
        Events.trigger('joke:registered');
      });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {

    var value;

    value = this.state.value;

    return (
        <div className="writing">
          <div className="close" onClick={this.close}>
            <span>x</span>
          </div>
          <form onSubmit={this.handleSubmit} >
            <textarea
              ref="joke"
              rows="5"
              maxLength="300"
              value={value}
              onChange={this.handleChange}
              placeholder="Write your joke..."></textarea>
            <p className="compteur" >{300 - value.length}</p>
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
