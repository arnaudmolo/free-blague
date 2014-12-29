/** @jsx React.DOM */

/**
 * @module Writing.view
 * @exports {ReactClass}Writing
 */

import React      from 'react/addons';
import { Events } from 'backbone';

import BaseClass   from './../utils/react-class';
import cleanString from './../utils/clean-string';
import User        from './../models/user';
import say         from './../utils/say';
import appDispatcher from './../dispatcher/appDispatcher';

class Writing {

  close() {
    appDispatcher
      .dispatch({
        actionType: 'show-writing',
        value: false
      });
  }

  handleSubmit(event) {

    var jokeDom;

    jokeDom = this.refs.joke.getDOMNode();

    event.preventDefault();

    appDispatcher
      .dispatch({
        actionType: 'add-joke',
        joke: cleanString(jokeDom.value)
      });
  }

  render() {

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

export default React.createClass(Writing.prototype);
