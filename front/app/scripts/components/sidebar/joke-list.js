import React from 'react/addons';

import JokeView from './Joke';

/**
 * @class JokeListView
 * Extended from React Class
 * Templates for Sidebar JokeList
 */

export default class JokeList extends React.Component {

  componentDidMount() {
    console.log('componentDidMount');
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
