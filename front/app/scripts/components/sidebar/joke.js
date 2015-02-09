import React from 'react/addons';

/**
 * @class JokeView
 * Extended from React Class
 * Templates for Sidebar Joke
 */

export default class JokeView extends React.Component {
  render() {
    return (
      <li>
        <span>{this.model.content}</span>
          &nbsp;|&nbsp;
          <a>x</a>
      </li>
    );
  }
}
