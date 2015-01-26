/** @jsx React.DOM */

/**
 * @module Writing.view
 * @exports {ReactClass}Writing
 */

import React from 'react/addons';
import { Events } from 'backbone';

import cleanString from './../utils/clean-string';
import appDispatcher from './../dispatcher/appDispatcher';

export default React.createClass(
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
                className="button isRed publish" > Publish my joke
              </button>
            </form>
          </div>
      );
    }
  }.prototype
);
