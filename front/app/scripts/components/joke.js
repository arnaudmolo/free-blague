import React from 'react/addons';
import Color from 'color';

import JokeActions from './../actions/joke-actions';

import stringToColor from './../utils/string-to-color';

let cx;

cx = React.addons.classSet;

function getStateFromStores() {
  return {
    bg: {
      backgroundColor: '#00FF00'
    },
    voted: false
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
    this.handleVoteDown = this.handleVoteDown.bind(this);
    this.handleVoteUp = this.handleVoteUp.bind(this);
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

  handleVoteDown(event) {
    JokeActions
      .voteDown(this.props.model);
    this.setState({voted: true});
  }

  handleVoteUp(event) {
    JokeActions
      .voteUp(this.props.model);
    this.setState({voted: true});
  }

  render() {

    let classes, style, joke, divider;

    classes = cx({
      'card--joke': true,
      isVoted: this.state.voted
    });

    joke = this.props.model;

    if (this.state.voted) {

      divider = joke.positiv + joke.negativ;
      divider = divider?divider:1;

      style = {
        width: ((joke.positiv / divider * 50) + 50) + '%'
      }
    };

    return (
      <li
        className={classes}>
        <div className="card--joke__face--front" style={this.state.bg}>
          <p>{this.props.model.content}</p>
          <div
            className="shadow"
            style={this.state.gradient} >
          </div>
        </div>
        <div className="card--joke__face--back" style={this.state.bg}>
          <div className="card--joke__vote--down" onClick={this.state.voted?void(0):this.handleVoteDown}></div>
          <div className="card--joke__vote--up" style={style} onClick={this.state.voted?void(0):this.handleVoteUp}></div>
        </div>
      </li>
    );
  }

}

JokeView.propTypes = {
  model: React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    content: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    order: React.PropTypes.number.isRequired,

    language: React.PropTypes.string
  })
};
