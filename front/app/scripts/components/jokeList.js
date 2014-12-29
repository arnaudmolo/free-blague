/** @jsx React.DOM */

import React    from 'react/addons';
import mixins   from  'backbone-react-component';

import JokeView from './Joke';

export default React.createClass(

  class JokeListView {

    get mixins() {
      return [mixins];
    }

    componentDidMount() {
      this.getCollection().on('all', this.forceUpdate, this);
    }

    componentWillUnmount() {
      this.getCollection().off(null, null, this);
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
  }.prototype
);
