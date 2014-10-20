/** @jsx React.DOM */

/**
* @module Joke.view
* @exports ReactClass JokeView
*/

import React  from 'react/addons';
import mixins from 'backbone-react-component';
import Color from 'Color';

import stringToColor from './../utils/string-to-color';

/**
 * @class JokeView
 * Extended from React Class
 * Templates for Sidebar Joke
 */

class JokeView {

  getInitialState() {
    return {
      bg: {
        backgroundColor: '#00FF00'
      }
    };
  }

  componentDidMount() {

    var startColor, endColor, color;

    color = stringToColor(this.getModel().get('content'));
    startColor = Color(color);
    endColor = startColor.clone().alpha(0.5);
    startColor = startColor.alpha(0);

    this.setState({
      bg: {
        backgroundColor: color
      },
      gradient: {
        background: 'linear-gradient(to bottom, rgba(' +
            startColor.red() +
            ', ' +
            startColor.green() +
            ', ' +
            startColor.blue() +
            ', ' +
            startColor.alpha() +
          '), rgba(' +
            endColor.red() +
            ', ' +
            endColor.green() +
            ', ' +
            endColor.blue() +
            ', ' +
            endColor.alpha() +
          ')' +
        ')'
      }
    });

  }

  render() {
    return (
      <li className="joke" style={this.state.bg}>
        <div className="wrapper">
          <p>{this.getModel().get('content')}</p>
          <div className="shadow" style={this.state.gradient}></div>
        </div>
      </li>
    );
  }
}

JokeView.prototype.mixins = [mixins];

module.exports = React.createClass(JokeView.prototype);

module.exports.static = JokeView;
