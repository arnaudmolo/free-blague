/** @jsx React.DOM */

/**
 * @module Sidebar.view
 * @exports {ReactClass}Sidebar
 */

import React from 'react/addons';
import mixins from  'backbone-react-component';

import Login from './login';
import Register from './register';
import JokeList from './JokeList';
import User from './../../models/user';
import userDispatcher from './../../dispatcher/userDispatcher';

/**
 * @class Sidebar
 * Extended from React Class and BaseClass
 * View for Sidebar JokeList
 */
export default React.createClass(

  class Sidebar {

    get mixins() {
      return [mixins];
    }

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

      User.on('all', () => {
        this.forceUpdate();
      });

      return;

    }

    componentWillUnmount() {

      User.off(null, null, this);

    }

    disconnect(event) {

      event.preventDefault();

      userDispatcher
        .dispatch({
          actionType: 'user-logout'
        });

    }

    render() {

      if (!User.get('logged')) {
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
  }.prototype
);
