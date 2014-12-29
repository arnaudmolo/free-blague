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
export default React.createClass(
  class JokeView {

    get mixins() {
      return [mixins];
    }

    componentDidMount() {

      this.getModel().on('all', () => {
        this.forceUpdate();
      });

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
  }.prototype
);
