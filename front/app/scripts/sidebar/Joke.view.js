/** @jsx React.DOM */

import React  from 'react';
import mixins from 'backbone-react-component';

class JokeView {
  render() {
    return (
      <li> {this.getModel().get('joke')}</li>
    );
  }
}

JokeView.prototype.mixins = [mixins];

module.exports = React.createClass(JokeView.prototype);
