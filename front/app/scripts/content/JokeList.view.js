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
    // console.log
      // ('ici', Object.getPrototypeOf(this).mixins, this.__proto__.mixins);
    return Object.getPrototypeOf(this.mixins);
  }

  componentDidMount() {
    return super();
  }

  render() {

    var jokesList;

    jokesList = this
      .getCollection()
      .map(function(joke){
        return (<JokeView model={joke} />);
      });

    return (
      <ul className="jokes-list" >
        { jokesList.reverse() }
      </ul>
    );
  }
}

module.exports = React.createClass(JokeListView.prototype);
