/** @jsx React.DOM */

/**
 * @module Sidebar.view
 * @exports {ReactClass}Sidebar
 */

import React from 'react/addons';
import mixins from  'backbone-react-component';

import Login from './login';
import Register from './register';
import JokeList from './joke-list';
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

      this.getModel().on('all', () => {
        this.forceUpdate();
      });

      return;

    }

    componentWillUnmount() {

      this.getModel().off(null, null, this);

    }

    disconnect(event) {

      event.preventDefault();

      userDispatcher
        .dispatch({
          actionType: 'user-logout'
        });

    }

    render() {

      var user;

      user = this.getModel();

      if (!user.get('logged')) {
        return (
            <div>
              <Login model={user} />
              <Register model={user} />
            </div>
          );
      }

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
  }.prototype
);
