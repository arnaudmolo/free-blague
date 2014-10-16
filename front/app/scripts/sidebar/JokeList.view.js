/** @jsx React.DOM */

import React    from 'react';
import mixins   from 'backbone-react-component';

import JokeView from './joke.view'

class JokeListView {

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
