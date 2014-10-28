/** @jsx React.DOM */

import React    from 'react/addons';

import JokeList from './../sidebar/JokeList.view';
import JokeView from './Joke.view';
import mixins from  'backbone-react-component';

var ReactCSSTransitionGroup;

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class JokeListView extends JokeList.static {

  getInitialState() {
    return super();
  }

  get mixins(){
    return [mixins];
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
      }).reverse();

    return (
      <ul className="jokes-list" >
        <ReactCSSTransitionGroup transitionName="joke-animation">
        { jokesList }
        </ReactCSSTransitionGroup>
      </ul>
    );
  }
}

module.exports = React.createClass(JokeListView.prototype);
