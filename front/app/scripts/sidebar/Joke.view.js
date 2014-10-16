/** @jsx React.DOM */

import React  from 'react';
import mixins from 'backbone-react-component';

class JokeView {
  render() {
    return (
      <li>
        <span>{this.getModel().get('content')}</span>
        |
        <a>x</a>
      </li>
    );
  }
}

JokeView.prototype.mixins = [mixins];

module.exports = React.createClass(JokeView.prototype);
