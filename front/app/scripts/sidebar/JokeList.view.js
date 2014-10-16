/** @jsx React.DOM */

import React    from 'react';
import mixins   from 'backbone-react-component';

import JokeView from './joke.view';

class JokeListView {

  getInitialState() {
    return {render: Math.random()};
  }

  componentDidMount() {

    var self, collection;

    self = this;

    collection = this.getCollection();

    collection.listenTo(collection, 'add', function(){
      self.setState({render: Math.random()});
    });

  }

  render() {

    var jokesList;

    jokesList = this.getCollection().map(function(joke){
      return (<JokeView model={joke} />);
    });

    return (
      <ul>{ jokesList }</ul>
    );
  }
}

JokeListView.prototype.mixins = [mixins];

module.exports = React.createClass(JokeListView.prototype);
