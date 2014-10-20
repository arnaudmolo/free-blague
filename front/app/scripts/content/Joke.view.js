/** @jsx React.DOM */

/**
* @module Joke.view
* @exports ReactClass JokeView
*/

import React  from 'react/addons';
import mixins from 'backbone-react-component';

import stringToColor from './../utils/string-to-color';

/**
 * @class JokeView
 * Extended from React Class
 * Templates for Sidebar Joke
 */

class JokeView {

  getInitialState() {
    return {backgroundColor: '#00FF00'};
  }

  componentDidMount() {

    this.setState({
        backgroundColor: stringToColor(
          this
            .getModel()
            .get('content')
          )
      });

  }

  render() {
    return (
      <li className="joke" style={this.state}>
        <div className="wrapper">
          <p>{this.getModel().get('content')}</p>
          <div className="shadow" style={this.state}></div>
        </div>
      </li>
    );
  }
}

JokeView.prototype.mixins = [mixins];

module.exports = React.createClass(JokeView.prototype);

module.exports.static = JokeView;
