/** @jsx React.DOM */

import React      from 'react';
import api        from '../api';

class Register {

  handleSubmit(event) {

    var user;

    event.preventDefault();

    user = this.getModel();

    user.set('email', this.refs.email.getDOMNode().value.trim());
    user.set('password', this.refs.password.getDOMNode().value.trim());

    return user.register();

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
}

module.exports = React.createClass(Register.prototype);
