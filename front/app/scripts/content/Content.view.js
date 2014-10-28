/** @jsx React.DOM */

/**
* @module Content.view
* @exports <ReactClass>ContentView
*/

import React  from 'react/addons';
import mixins from 'backbone-react-component';

import Content        from './Content';
import Writing        from './Writing.view';
import JokeCollection from '../models/joke-list';
import JokeList       from './JokeList.view';

/**
 * @class ContentView
 * Extended from React Class
 * Templates for Content
 */

class ContentView {

  componentDidMount() {

    var content, self;

    self = this;
    content = this.getModel();

    function testFunction(){
      if (content.get('mute')) {
        self.setState({wording: 'unmute'});
      }else{
        self.setState({wording: 'mute'});
      }
    }

    content.on('change:mute', testFunction);
    content.listenTo(content.get('jokes'), 'add', function(joke){
      self.launchWriting(joke.toString());
    });
    testFunction();
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

    function relaunch(){
      setTimeout(function(){
        ++iteration;
        console.log(joke.slice(0, iteration), iteration);
        self.setState({joke: joke.slice(0, iteration)});
        if (iteration <= joke.length) {
          relaunch(joke);
        }
      }, 100);

      relaunch();

    }
  }

  render() {

    var wording;

    if (this.state.writing) {
      wording = <Writing />;
    }

    return (
      <div>
        <h1>{this.state.joke}</h1>
        <JokeList
          collection={this.getModel().get('jokes')} />
        <input
          onClick={this.toggleMute}
          type="submit" value={this.state.wording} />
        <a
          href=""
          onClick={this.showInput}>Write a joke</a>
        {wording}
      </div>
    );
  }
}

ContentView = React.createClass(ContentView.prototype);

React.renderComponent(
  <ContentView model={Content} />,
  document.getElementsByClassName('content')[0]
);

module.exports = ContentView;
