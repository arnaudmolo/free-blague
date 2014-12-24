/** @jsx React.DOM */

/**
* @module Content.view
* @exports <ReactClass>ContentView
*/

import React    from 'react/addons';
import mixins   from 'backbone-react-component';
import Backbone from 'backbone';

import Writing        from './Writing';
import JokeCollection from '/models/joke-list';
import JokeList       from './JokeList';

var Events, ReactCSSTransitionGroup;

Events                  = Backbone.Events;
ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * @class ContentView
 * Extended from React Class
 * Templates for Content
 */

class ContentView {

  testFunction() {
    if (this.getModel().get('mute')) {
      this.setState({wording: 'unmute'});
    } else {
      this.setState({wording: 'mute'});
    }
  }

  componentDidMount() {

    var content, self;

    self = this;
    content = this.getModel();

    content.on('change:mute', this.testFunction);

    content.listenTo(content.get('jokes'), 'add', function(joke){
      self.launchWriting(joke.toString());
    });

    Events.on('joke:registered', function(){
      self.setState({writing: false});
    });

    Events.on('close', function(){
      self.setState({writing: false});
    });

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

    return;

  }

  launchWriting (joke) {

    var self, iteration, timeout;

    self      = this;
    iteration = 0;
    this.setState({joke: joke});

    // function relaunch(){
    //   setTimeout(function(){
    //     ++iteration;
    //     self.setState({joke: joke.slice(0, iteration)});
    //     if (iteration <= joke.length) {
    //       relaunch(joke);
    //     }
    //   }, 100);

    //   relaunch();

    // }
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
