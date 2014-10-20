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
    return {
      bg: {
        backgroundColor: '#00FF00'
      }
    };
  }

  componentDidMount() {

    var color;

    color = stringToColor(this.getModel().get('content'));

    this.setState({
      bg: {
        backgroundColor: color
      },
      gradient: {
        background: 'linear-gradient(to bottom, ' + color + ', ' + color + ')'
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
