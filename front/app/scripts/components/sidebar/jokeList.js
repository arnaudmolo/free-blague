/** @jsx React.DOM */

/**
* @module JokeList.view
* @exports <ReactClass>JokeListView
*/

import React from 'react/addons';
import mixins from 'backbone-react-component';

import JokeView from './Joke';

/**
 * @class JokeListView
 * Extended from React Class
 * Templates for Sidebar JokeList
 */
export default React.createClass(
  class JokeListView {

    get mixins() {
      return [mixins];
    }

    /**
     * Invoked once, only on the client (not on the server),
     * immediately after the initial rendering occurs.
     * Listen to collections updates.
     * Render when elements are added.
     *
     * @return {Object} undefined
     */

    componentDidMount() {

      this.getCollection().on('all', () => this.forceUpdate());

    }

    render() {

      var jokesList;

      jokesList = this.getCollection().map(function(joke){
        return (<JokeView key={joke.get('id')} model={joke} />);
      });

      return (
        <ul>
          { jokesList }
        </ul>
      );
    }
  }.prototype
);
