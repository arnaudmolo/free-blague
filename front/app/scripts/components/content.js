/** @jsx React.DOM */

/**
* @module Content.view
* @exports <ReactClass>ContentView
*/

import React from 'react/addons';
import mixins from 'backbone-react-component';

import Writing from './writing';
import JokeList from './jokeList';
import MainJoke from './main-joke';
import Sidebar from './sidebar/sidebar';
import appDispatcher from './../dispatcher/appDispatcher';

/**
 * @class ContentView
 * Templates for Content
 */

export default React.createClass(

  class ContentView {

    get mixins() {
      return [mixins];
    }

    /**
     * Set defaults values for the this.state
     *
     * @return {Object} The default's JokeListView this.state
     */

    getInitialState() {
      return {
        joke   : '',
        wording: 'mute',
        writing: false
      };
    }

    componentDidMount() {

      this.getModel().on('all', () => this.forceUpdate());

    }

    componentWillUnmount() {
      return this.getModel().off(null, null, this);
    }

    toggleMute() {
      return this.getModel().mute(!this.getModel().get('mute'));
    }

    showInput(event) {

      event.preventDefault();

      appDispatcher
        .dispatch({
          actionType: 'show-writing',
          value: true
        });

      return

    }

    launchWriting (joke) {
      this.setState({joke: joke});
    }

    render() {

      var writing, toggleClass, model, jokes;

      model = this.getModel();

      jokes = model.get('jokes');

      if (model.get('showWriting')) {
        writing = <Writing />;
      }

      toggleClass = model.get('mute')?'unmute':'mute';

      return (
        <div>
          <div className="side-bar">

          </div>
          <div>
            <MainJoke collection={jokes} />
            <JokeList
              collection={jokes} />
            <input
              type="submit"
              onClick={this.toggleMute}
              value=""
              className={toggleClass} />
            <a
              className="button red publish"
              href=""
              onClick={this.showInput}>Publish my Joke</a>
            <React.addons.CSSTransitionGroup
              transitionName="writing-animation">
              {writing}
            </React.addons.CSSTransitionGroup>
          </div>
        </div>
      );
    }
  }.prototype

);
