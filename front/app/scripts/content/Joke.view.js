/** @jsx React.DOM */

/**
* @module Joke.view
* @exports ReactClass JokeView
*/

import React    from 'react/addons';
import mixins   from 'backbone-react-component';
import Color    from 'color';

import stringToColor from './../utils/string-to-color';

var events;

/**
 * @class JokeView
 * Extended from React Class
 * Templates for Sidebar Joke
 */

class JokeView {

  get mixins(){
    return [mixins];
  }

  getInitialState() {
    return {
      bg: {
        backgroundColor: '#00FF00'
      },
      voted: false
    };
  }

  componentDidMount() {

    var self, startColor, endColor, color, model;

    self       = this;
    model      = this.getModel();
    color      = stringToColor(model.get('content'));
    startColor = Color(color);
    endColor   = startColor.clone().alpha(0.5);
    startColor = startColor.alpha(0);

    model.on('change:vote', function(){
      self.voted();
    });

    this.setState({
      voted: model.get('voted'),
      bg: {
        backgroundColor: color
      },
      gradient: {
        background:
          `linear-gradient(
            to bottom,
            rgba(
              ${startColor.red()},
              ${startColor.green()},
              ${startColor.blue()},
              ${startColor.alpha()}
            ), rgba(
              ${endColor.red()},
              ${endColor.green()},
              ${endColor.blue()},
              ${endColor.alpha()}
            )
          )`
      }
    });

  }

  voted(){
    this.setState({
      voted: true
    });
  }

  handleUpVote(event) {

    var model, count;

    model = this.getModel();
    count = model.get('positiv') + 1;

    model.set({
      vote   : true,
      positiv: count
    });
  }

  handleDownVote(event) {

    var model, count;

    model = this.getModel();
    count = model.get('negativ') + 1;

    model.set({
      vote   : false,
      negativ: count
    });
  }

  render() {

    var vote;

    // <div className="wrapper">
    //   <p>{this.getModel().get('content')}</p>
    //   <div
    //     className="shadow"
    //     style={this.state.gradient} >
    //   </div>
    // </div>

    if (!this.state.voted) {
      vote = (
        <span>
          <button onClick={this.handleUpVote}>+</button>
          <button onClick={this.handleDownVote}>-</button>
        </span>
      );
    };

    return (
      <li
        className="joke"
        style={this.state.bg}
        key={this.props.key}>
        { vote }
      </li>
    );
  }
}

module.exports = React.createClass(JokeView.prototype);

module.exports.static = JokeView;
