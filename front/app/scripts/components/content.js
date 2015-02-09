import React from 'react/addons';
import JokeStore from './../stores/joke-store';

import appDispatcher from './../dispatcher/app-dispatcher';

import Writing from './writing';
import JokeList from './joke-list';
import MainJoke from './main-joke';
import Mute from './mute';

function getStateFromStores() {
  return {
    wording: 'mute',
    mute: false,
    writing: false
  };
}

/**
 * @class ContentView
 * Templates for Content
 */

var {CSSTransitionGroup} = React.addons;

export default class ContentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this.showWriting = this.showWriting.bind(this);
    this.showInput   = this.showInput.bind(this);
  }

  showWriting(event) {
    event.preventDefault();
    console.log('show input');
  }

  showInput(event) {
    event.preventDefault();
    this.setState({
      writing: !this.state.writting
    });
  }

  launchWriting(joke) {
    this.setState({joke});
  }

  render() {
    return (
      <div>
        <MainJoke />
        <JokeList />
        <Mute />
        <a
          className="button red publish"
          href=""
          onClick={this.showInput}>Publish my joke
        </a>
        {this.state.writing?<Writing />:undefined}
      </div>
      );
  }
}
