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
    // ('ici', Object.getPrototypeOf(this).mixins, this.__proto__.mixins);
    return this.__proto__.mixins;
  }

  componentDidMount() {
    return super();
  }

  render() {

    var jokesList;

    jokesList = this
      .getCollection()
      .map(function(joke, index){
        return (<JokeView key={index} model={joke} />);
      })
      .reverse();

    return (
      <ul className="jokes-list" >
        { jokesList }
      </ul>
    );
  }
}

module.exports = React.createClass(JokeListView.prototype);
