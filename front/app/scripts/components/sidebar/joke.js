/** @jsx React.DOM */

/**
* @module Joke.view
* @exports ReactClass JokeView
*/

import React  from 'react/addons';
import mixins from 'backbone-react-component';

/**
 * @class JokeView
 * Extended from React Class
 * Templates for Sidebar Joke
 */

class JokeView {

  constructor() {
    this.mixins = [mixins];
  }

  componentDidMount() {
    console.log(this);
  }

  render() {

    var model;

    model = this.getModel();

    return (
      <li>
        <span>{model.get('content')}</span>
        &nbsp;|&nbsp;
        <a>x</a>
      </li>
    );
  }
}

module.exports = React.createClass(JokeView.prototype);
