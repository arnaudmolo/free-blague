/** @jsx React.DOM */

import React      from 'react';
import decodeUser from '../utils/form-parser';
import api        from '../api'

class Register {

  handleSubmit(event) {

    var email, password, user;

    event.preventDefault();

    return api
      .createUser({
        email: this.refs.email.getDOMNode().value.trim(),
        password: this.refs.password.getDOMNode().value.trim()
      })
      .then(function(res){
        console.log('user created', res);
        return res;
      });
  }

  render() {
    return (
      <nav>
        <h1>Create</h1>
        <form method="post" onSubmit={this.handleSubmit}>
          <input type="email"    placeholder="email" ref="email" />
          <input type="password" placeholder="password" ref="password" />
          <input type="submit" />
        </form>
      </nav>
    );
  }
}

module.exports = React.createClass(Register.prototype);
