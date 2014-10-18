/** @jsx React.DOM */

/**
 * @module Sidebar.view
 * @exports {ReactClass}Sidebar
 */

import React    from 'react';

import Login     from './login.view';
import Register  from './register.view';
import JokeList  from './JokeList.view';
import User      from '../models/user';
import BaseClass from '../utils/react-class';

/**
 * @class Sidebar
 * Extended from React Class and BaseClass
 * View for Sidebar JokeList
 */

class Sidebar extends BaseClass {

  /**
   * Set defaults values for the this.state.
   * {Object}#visible decide if the login forms are visibles
   *
   * @return {Object} The default's SidebarView this.state.
   */

  getInitialState() {
    return {visible: true};
  }

  /**
   * Invoked once, only on the client (not on the server),
   * immediately after the initial rendering occurs.
   * Listen to the User's logged attribute.
   * Hide forms when User is logged.
   *
   * @return {Object} undefined
   */

  componentDidMount() {

    var self;

    self = this;

    User.listenTo(User, 'change:logged', function(){
      self.setState({visible: !User.get('logged')});
    });

    return;

  }

  disconnect(event) {
    event.preventDefault();
    return User.logout();
  }

  render() {

    if (this.state.visible) {
      return (
          <div>
            <Login model={User} />
            <Register model={User} />
          </div>
        );
    }

    return (
      <div>
        <JokeList
          collection={User.get('jokes')} />
        <input
          type="submit"
          value="disconnect"
          onClick={this.disconnect} />
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
