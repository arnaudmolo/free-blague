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
            email: this.refs.email.getDOMNode().value.trim(),
            password: this.refs.password.getDOMNode().value.trim()
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
              type="email"
              placeholder="email"
              ref="email" />
            <input
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
