/** @jsx React.DOM */

import React     from 'react';
import mixins    from 'backbone-react-component';

import api       from '../api';
import BaseClass from '../utils/react-class';

class Login extends BaseClass {

  get mixins() {
    return [mixins];
  }

  handleSubmit(event) {

    var user;

    event.preventDefault();

    user = this.getModel();

    user.set('email', this.refs.email.getDOMNode().value.trim());
    user.set('password', this.refs.password.getDOMNode().value.trim());
    return user.login();
  }

  render() {
    return (
      <div>
        <h1>login</h1>
        <form method="post" onSubmit={this.handleSubmit}>
          <input type="email"    value="john@doe.com" placeholder="email" ref="email"/>
          <input type="password" value="opensesame" placeholder="password" ref="password"/>
          <input type="submit" />
        </form>
      </div>
    );
  }

}

module.exports = React.createClass(Login.prototype);
