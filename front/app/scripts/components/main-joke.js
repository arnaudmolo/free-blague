import React from 'react/addons';

import JokeStore from './../stores/joke-store';

import Lettering from './lettering';

function getStateFromStores() {
  return {
    joke: JokeStore.getLastJoke()
  }
}

/**
 * @class MainJoke
 * Templates for the main joke
 */

export default class MainJoke extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    JokeStore.addChangeListener(this._onChange);
  }

  componentWillUnount() {
    JokeStore.removeChangeListener(this._onChange);
  }

  _onChange(event) {
    this.setState(getStateFromStores());
  }

  render() {

    return (
      <div className="joke-container">
        <h1>
          <Lettering string={this.state.joke.content} />
        </h1>
      </div>
    );

  }

}
