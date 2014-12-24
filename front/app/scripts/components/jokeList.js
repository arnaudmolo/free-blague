/** @jsx React.DOM */

import React    from 'react/addons';
import mixins   from  'backbone-react-component';

import JokeList from './sidebar/JokeList';
import JokeView from './Joke';

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
