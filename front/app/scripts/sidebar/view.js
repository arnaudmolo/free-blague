/** @jsx React.DOM */

import React    from 'react';
import Backbone from 'backbone';

import Login    from './login.view';
import Register from './register.view';
import JokeList from './JokeList.view';
import User     from '../models/user';

class Sidebar {

  getInitialState() {
    return {visible: true};
  }

  componentDidMount() {

    var self;

    self = this;

    User.listenTo(User, 'change:logged', function(){
      self.setState({visible: false});
    })

  }

  render() {

    if (this.state.visible) {
      return (
          <div>
            <Login model={User} />
            <Register model={User} />
          </div>
        );
    };

    return (
      <div>
        <JokeList collection={User.get('jokes')} />
      </div>
    );
  }
}

Sidebar = React.createClass(Sidebar.prototype);

React.renderComponent(
  <Sidebar />,
  document.getElementsByClassName('sidebar')[0]
);

module.exports = Sidebar;
