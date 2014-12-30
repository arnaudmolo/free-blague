/** @jsx React.DOM */

/**
* @module Content.view
* @exports <ReactClass>ContentView
*/

import React from 'react/addons';
import mixins from 'backbone-react-component';
import { Events } from 'backbone';

import Writing from './Writing';
import JokeCollection from './../models/joke-list';
import JokeList from './JokeList';
import Sidebar from './sidebar/sidebar';
import appDispatcher from './../dispatcher/appDispatcher';

/**
 * @class ContentView
 * Extended from React Class
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

      var model;

      model = this.getModel();

      model.on('all', (e) => {
        this.forceUpdate();
      });

      return;

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

      var writing, toggleClass, model;

      model = this.getModel();

      if (model.get('showWriting')) {
        writing = <Writing />;
      }

      if (model.get('mute')) {
        toggleClass = 'unmute';
      } else {
        toggleClass = 'mute';
      };

      return (
        <div>
          <div className="side-bar">
            <Sidebar />
          </div>
          <div>
            <div className="joke-container">
              <h1>{this.state.joke}</h1>
            </div>
            <JokeList
              collection={this.getModel().get('jokes')} />
            <input
              type="submit"
              onClick={this.toggleMute}
              value=""
              className={toggleClass} />
              { toggleClass }
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
