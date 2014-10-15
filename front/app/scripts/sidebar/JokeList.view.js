/** @jsx React.DOM */

import React from 'react';

class JokeList {

  handleSubmit(e) {

    var email, password;

    console.log(this);

    e.preventDefault();

    // email = e.target[0];
    // password = e.target[1];

    // user = {
    //   email: email.value.trim(),
    //   password: password.value.trim()
    // };

    // email.disabled = true;
    // password.disabled = true;

    // return api
    //   .loginUser(user)
    //   .then(function(res) {
    //     console.log("log", res);
    //     return res;
    //   });

  }

  render() {

    var jokes;

    jokes = [];

    for (var i = 0; i < 3; i++) {
      jokes.push(<li> kouk </li>);
    };

    return (
      <ul>{ jokes }</ul>
    );
  }
}

module.exports = React.createClass(JokeList.prototype);
