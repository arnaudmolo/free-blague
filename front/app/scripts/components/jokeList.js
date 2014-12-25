/** @jsx React.DOM */

import React    from 'react/addons';
import mixins   from  'backbone-react-component';

import JokeView from './Joke';

class JokeListView {

  componentDidMount() {
    this.props.collection.on('add', () => { this.forceUpdate() });
  }

  render() {

    var jokesList;

    jokesList = this
      .props
      .collection
      .map(function(joke, index){
        return (<JokeView key={index} model={joke} />);
      }).reverse();

    return (
      <ul className="jokes-list" >
        <React.addons.CSSTransitionGroup transitionName="joke-animation">
        { jokesList }
        </React.addons.CSSTransitionGroup>
      </ul>
    );
  }
}

export default React.createClass(JokeListView.prototype);
