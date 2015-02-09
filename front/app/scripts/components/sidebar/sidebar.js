/** @jsx React.DOM */

/**
 * @module Sidebar.view
 * @exports {ReactClass}Sidebar
 */

import React from 'react/addons';

import UserStore from './../../stores/user-store';

import Login from './login';
import Register from './register';
import JokeList from './joke-list';

/**
 * @class Sidebar
 * Extended from React Class and BaseClass
 * View for Sidebar JokeList
 */

function getStateFromStore() {
  return {
    visible: true,
    user: UserStore.getUserData()
  };
}

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStore();
  }

  render() {
    if (true) {
      return (
        <div>
          <Login />
          <Register />
        </div>
      );
    };

    return (
      <div>
        <JokeList
          collection={user.get('jokes')} />
        <input
          type="submit"
          value="disconnect"
          onClick={this.disconnect} />
      </div>
    );
  }

}
