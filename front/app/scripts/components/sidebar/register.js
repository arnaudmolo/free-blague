/** @jsx React.DOM */

/**
* @module Register.view
* @exports <ReactClass>Register
*/

import React from 'react/addons';
import mixins from 'backbone-react-component';

import api from './../../api';
import userDispatcher from './../../dispatcher/userDispatcher';

export default React.createClass(

  class Register {

    get mixins() {
      return [mixins];
    }

    /**
     * Tiggered when form is submitted
     * Set the model's attributes and lanuch User#register()
     *
     * @return @see User#register
     */

    handleSubmit(event) {

      event.preventDefault();

      userDispatcher
        .dispatch({
          actionType: 'user-register',
          user: {
            email: this.refs.email.getDOMNode().value.trim(),
            password: this.refs.password.getDOMNode().value.trim()
          }
        });

      return;

    }

    render() {
      return (
        <nav>
          <h1>Create</h1>
          <form method="post" onSubmit={this.handleSubmit}>
            <input type="email"    placeholder="email" ref="email" />
            <input type="password"
              placeholder="password"
              ref="password"
            />
            <input type="submit" />
          </form>
        </nav>
      );
    }
  }.prototype
);
