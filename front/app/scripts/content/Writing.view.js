/** @jsx React.DOM */

/**
 * @module Writing.view
 * @exports {ReactClass}Writing
 */

import React from 'react/addons';

import BaseClass   from './../utils/react-class';
import cleanString from './../utils/clean-string';
import User        from './../models/user';
import say         from './../say';

class Writing {

  handleSubmit(event) {

    var jokeDom;


    jokeDom = this.refs.joke.getDOMNode();

    event.preventDefault();

    User
      .createJoke(cleanString(jokeDom.value))
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
