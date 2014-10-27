/** @jsx React.DOM */

/**
 * @module Writing.view
 * @exports {ReactClass}Writing
 */

import React from 'react/addons';

import BaseClass from './../utils/react-class';
import User      from './../models/user';
import say       from './../say';

class Writing {

  handleSubmit(event) {

    var jokeDom;

    jokeDom = this.refs.joke.getDOMNode();

    event.preventDefault();

    User
      .createJoke(jokeDom.value.trim())
      .then(function(res){
        jokeDom.value = '';
        say(res.content);
      });

  }

  render() {

    return (
      <form onSubmit={this.handleSubmit} >
        <input
          type="text"
          ref="joke" >
        </input>
        <input
          type="submit" />
      </form>
    );
  }

}

module.exports = React.createClass(Writing.prototype);
