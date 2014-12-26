/** @jsx React.DOM */

/**
* @module Content.view
* @exports <ReactClass>ContentView
*/

import React      from 'react/addons';
import mixins     from 'backbone-react-component';
import { Events } from 'backbone';

import Writing        from './Writing';
import JokeCollection from './../models/joke-list';
import JokeList       from './JokeList';

/**
 * @class ContentView
 * Extended from React Class
 * Templates for Content
 */

export default React.createClass(
  class ContentView {

    testFunction() {
      if (this.getModel().get('mute')) {
        this.setState({wording: 'unmute'});
      } else {
        this.setState({wording: 'mute'});
      }
    }

    componentDidMount() {

      var model;

      model = this.getModel();

      model.on('change:mute', this.testFunction, this);

      model.get('jokes').on('add', function(joke){
        this.launchWriting(joke.toString());
      }, this);

      Events.on('joke:registered', function(){
        this.setState({writing: false});
      }, this);

      Events.on('close', function(){
        this.setState({writing: false});
      }, this);

      this.testFunction();

      return;

    }

    /**
     * Set defaults values for the this.state.
     *
     * @return {Object} The default's JokeListView this.state.
     */

    getInitialState() {
      return {
        joke   : '',
        wording: 'mute',
        writing: false
      };
    }

    get mixins() {
      return [mixins];
    }

    toggleMute() {
      return this.getModel().mute(!this.getModel().get('mute'));
    }

    showInput(event) {
      event.preventDefault();
      this.setState({writing: true});
    }

    launchWriting (joke) {
      this.setState({joke: joke});
    }

    render() {

      var writing;

      if (this.state.writing) {
        writing = <Writing />;
      }

      return (
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
            className={this.state.wording} />
          <a
            className="button red publish"
            href=""
            onClick={this.showInput}>Publish my Joke</a>
          <React.addons.CSSTransitionGroup
            transitionName="writing-animation">
            {writing}
          </React.addons.CSSTransitionGroup>
        </div>
      );
    }
  }.prototype
);
