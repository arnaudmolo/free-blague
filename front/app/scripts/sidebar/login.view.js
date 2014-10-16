/** @jsx React.DOM */

import React    from 'react';
import FormData from 'react-form-data';
import api      from '../api'

class Login {

  get mixins() {
    return [FormData];
  }

  handleSubmit(event) {

    event.preventDefault();

    return api
      .loginUser({
        email: this.refs.email.getDOMNode().value.trim(),
        password: this.refs.password.getDOMNode().value.trim()
      })
      .then(function(res) {
        console.log("Login", res);
        return res;
      });
  }

  render() {
    return (
      <div>
        <h1>login</h1>
        <form method="post" onSubmit={this.handleSubmit}>
          <input type="email"    placeholder="email" ref="email"/>
          <input type="password" placeholder="password" ref="password"/>
          <input type="submit" />
        </form>
      </div>
    );
  }

}

Login = React.createClass(Login.prototype);

module.exports = Login;
