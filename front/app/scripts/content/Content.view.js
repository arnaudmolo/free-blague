/** @jsx React.DOM */

/**
* @module Content.view
* @exports <ReactClass>ContentView
*/

import React  from 'react';
import mixins from 'backbone-react-component';

import JokeCollection from '../models/joke-list';
import JokeList       from '../sidebar/JokeList.view';
import Content        from './Content';

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

    content.listenTo(content, 'change:mute', function(){
      if (content.get('mute')) {
        self.setState({wording: 'unmute'});
      }else{
        self.setState({wording: 'mute'});
      }
    });

  }

  /**
   * Set defaults values for the this.state.
   *
   * @return {Object} The default's JokeListView this.state.
   */

  getInitialState() {
    return {wording: 'mute'};
  }

  get mixins() {
    return [mixins];
  }

  toggleMute() {

    this.getModel().mute(!this.getModel().get('mute'));

  }

  render() {
    return (
      <div>
        <JokeList collection={this.getModel().get('jokes')} />
        <input onClick={this.toggleMute} type="submit" value={this.state.wording} />
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
