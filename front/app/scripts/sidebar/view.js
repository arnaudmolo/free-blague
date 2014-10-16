/** @jsx React.DOM */

import React from 'react';
import Backbone from 'backbone';

import Login    from './login.view';
import Register from './register.view';
import JokeList from './JokeList.view';
import User     from '../user/user';

var jokesList = new Backbone.Collection([{joke: 'Hello world!'}, {joke: 'Hello world!'}, {joke: 'Hello world!'}]);

class Sidebar {
  render() {
    return (
      <div>
        <Login model={User} />
        <Register />
        <JokeList collection={jokesList} />
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
