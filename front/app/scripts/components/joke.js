import React from 'react/addons';
import Color from 'Color';

import stringToColor from './../utils/string-to-color';

function getStateFromStores() {
  return {
    bg: {
      backgroundColor: '#00FF00'
    }
  }
}

/**
 * @class JokeView
 * Extended from React Class
 * Templates for Sidebar Joke
 */

export default class JokeView extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
  }

  componentDidMount() {

      var startColor, endColor, color;

      color = stringToColor(this.props.model.content);
      startColor = Color(color);
      endColor = startColor.clone().alpha(0.5);
      startColor = startColor.alpha(0);

      this.setState({
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

  render() {

    return (
      <li
        className="joke"
        style={this.state.bg}
        key={this.props.key} >
        <div className="wrapper">
          <p>{this.props.model.content}</p>
          <div
            className="shadow"
            style={this.state.gradient} >
          </div>
        </div>
      </li>
    );
  }

}
