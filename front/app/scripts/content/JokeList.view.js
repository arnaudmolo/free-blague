/** @jsx React.DOM */

import React    from 'react/addons';
import _        from 'lodash';

import JokeList from './../sidebar/JokeList.view';
import JokeView from './Joke.view';

var ReactCSSTransitionGroup;

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class JokeListView extends JokeList.static {

  getInitialState() {
    return super();
  }

  get mixins(){
    return this.__proto__.mixins;
  }

  componentDidMount() {
    return super();
  }

  render() {

    var jokesList;

    jokesList = this.getCollection().map(function(joke){
      return (<JokeView model={joke} />);
    });

    return (
      <ul>
        { jokesList }
      </ul>
      );
  }
}

module.exports = React.createClass(JokeListView.prototype);
