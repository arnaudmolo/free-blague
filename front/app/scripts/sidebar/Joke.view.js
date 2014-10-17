/** @jsx React.DOM */

/**
* @module Joke.view
* @exports ReactClass JokeView
*/

import React  from 'react';
import mixins from 'backbone-react-component';

/**
 * @class JokeView
 * Extended from React Class
 * Templates for Sidebar Joke
 */

class JokeView {
  render() {
    return (
      <li>
        <span>{this.getModel().get('content')}</span>
        &nbsp;|&nbsp;
        <a>x</a>
      </li>
    );
  }
}

JokeView.prototype.mixins = [mixins];

module.exports = React.createClass(JokeView.prototype);
