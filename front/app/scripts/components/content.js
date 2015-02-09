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

var {CSSTransitionGroup} = React.addons;

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
      if (this.props.user) {
        this.props.user.on('all', () => this.forceUpdate());
      };
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
      return;
    }

    launchWriting (joke) {
      this.setState({joke});
    }

    render() {

      var model, jokes, jokeList, logged, sidebar;

      model = this.getModel();
      jokes = model.get('jokes');

      if (this.props.user) {
        logged = this.props.user.get('logged');
      };

      if (jokes !== undefined) {
        jokeList = (
          <span>
            <MainJoke collection={jokes} />
            <JokeList collection={jokes} />
          </span>
        );
      };

      if (!logged) {
        sidebar = (<div className="side-bar"><Sidebar></Sidebar></div>);
      };

      return (
        <div>
          {sidebar}
          <div>
            { jokeList }
            <input
              type="submit"
              onClick={this.toggleMute}
              value=""
              className={model.get('mute')?'unmute':'mute'} />
            <a
              className="button red publish"
              href=""
              onClick={this.showInput}>Publish my Joke</a>

            <CSSTransitionGroup
              transitionName="writing-animation">
            </CSSTransitionGroup>
          </div>
        </div>
      );
    }
  }.prototype

);
