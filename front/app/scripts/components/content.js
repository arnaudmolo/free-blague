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

var ReactCSSTransitionGroup;

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * @class ContentView
 * Extended from React Class
 * Templates for Content
 */

class ContentView {

  muteStateToggle() {
    if (this.props.model.get('mute')) {
      this.setState({wording: 'unmute'});
    } else {
      this.setState({wording: 'mute'});
    }
  }

  componentDidMount() {

    var content, self;

    self = this;
    content = this.props.model;

    content.on('change:mute', this.muteStateToggle, this);
    content.get('jokes').on('add', () => this.launchWriting(joke.toString()));

    Events.on('joke:registered', function(){
      self.setState({writing: false});
    });

    Events.on('close', function(){
      self.setState({writing: false});
    });

    this.muteStateToggle();

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
    return this.props.model.mute(!this.props.model.get('mute'));
  }

  showInput(event) {

    event.preventDefault();
    this.setState({writing: true});

    return;

  }

  launchWriting () {
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
          collection={this.props.model.get('jokes')} />
        <input
          type="submit"
          onClick={this.toggleMute}
          value=""
          className={this.state.wording} />
        <a
          className="button red publish"
          href=""
          onClick={this.showInput}>Publish my Joke</a>
        <ReactCSSTransitionGroup
          transitionName="writing-animation">
          {writing}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

ContentView = React.createClass(ContentView.prototype);

module.exports = ContentView;
