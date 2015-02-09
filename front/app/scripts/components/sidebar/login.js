/** @jsx React.DOM */

/**
* @module Login.view
* @exports <ReactClass>Login
*/

import React from 'react/addons';
import mixins from 'backbone-react-component';

import userDispatcher from './../../dispatcher/userDispatcher';

/**
 * @class Login
 * Extended from React Class and BaseClass
 * View for Sidebar JokeList
 */
export default React.createClass(

  class Login {

    get mixins() {
      return [mixins];
    }

    getInitialState() {
      return {
        email: 'aze@aze.com',
        password: 'aze'
      }
    }

    /**
     * Tiggered when form is submitted
     * Set the model's attributes and lanuch User#login()
     *
     * @return @see User#login
     */

    handleSubmit(event) {

      event.preventDefault();

      userDispatcher
        .dispatch({
          actionType: 'user-login',
          user: {
            email: this.state.email,
            password: this.state.password
          }
        });

      return;
    }

    render() {
      return (
        <div>
          <h1>login</h1>
          <form method="post" onSubmit={this.handleSubmit}>
            <input
              defaultValue={this.state.email}
              type="email"
              placeholder="email"
              ref="email" />
            <input
              defaultValue={this.state.password}
              type="password"
              placeholder="password"
              ref="password"/>
            <input type="submit" />
          </form>
        </div>
      );
    }
  }.prototype
);
