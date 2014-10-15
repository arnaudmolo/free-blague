/** @jsx React.DOM */

import React    from 'react';
import Login    from './login.view';
import Register from './register.view';
import JokeList from './JokeList.view';

class Sidebar {
  render() {
    return (
      <div>
        <Login />
        <Register />
        <JokeList />
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
