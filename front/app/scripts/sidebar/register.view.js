/** @jsx React.DOM */

import decodeUser from '../utils/form-parser';

import React from 'react';

class Register {

  handleSubmit(e) {

    var email, password, user;

    e.preventDefault();

    // console.log("log");

    // email = e.target[0];
    // password = e.target[1];

    // user = {
    //   email: email.value,
    //   password: password.value
    // };

    // email.disabled = true;
    // password.disabled = true;

    // api
    //   .createUser(user)
    //   .then(function(res){
    //     console.log('user created', res);
    //     form.parentNode.removeChild(form);
    //   });
  }

  render() {
    return (
      <nav>
        <h1>Create</h1>
        <form method="post" id="create-user" onSubmit={this.handleSubmit}>
          <input type="email"    placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="submit" />
        </form>
      </nav>
    );
  }
}

module.exports = React.createClass(Register.prototype);
