/** @jsx React.DOM */

/**
 * @module Sidebar.view
 * @exports {ReactClass}Sidebar
 */

import React from 'react/addons';

import UserStore from './../../stores/user-store';
import UserActions from './../../actions/user-actions';

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
    user: UserStore.getUserData()
  };
}

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStore();
    this._onChange = this._onChange.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  disconnect() {
    UserActions
      .disconnect();
  }

  _onChange() {
    this.setState(getStateFromStore());
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  render() {
    if (!this.state.user.logged) {
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
          collection={this.state.user.jokes} />
        <input
          type="submit"
          value="disconnect"
          onClick={this.disconnect} />
      </div>
    );
  }

}
