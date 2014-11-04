/** @jsx React.DOM */

/**
* @module JokeList.view
* @exports <ReactClass>JokeListView
*/

import React    from 'react/addons';
import mixins   from 'backbone-react-component';

import JokeView from './Joke.view';

/**
 * @class JokeListView
 * Extended from React Class
 * Templates for Sidebar JokeList
 */

class JokeListView {

  get mixins() {
    return [mixins];
  }

  /**
   * Set defaults values for the this.state.
   * Random to force rerender
   *
   * @return {Object} The default's JokeListView this.state.
   */

  getInitialState() {
    return {render: Math.random()};
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

    var self, collection;

    self = this;
    collection = this.getCollection();

    collection.listenTo(collection, 'add', function(){
      self.setState({render: Math.random()});
    });

    return;

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
}

module.exports = React.createClass(JokeListView.prototype);

module.exports.static = JokeListView;
