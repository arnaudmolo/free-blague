/** @jsx React.DOM */

/**
* @module Register.view
* @exports <ReactClass>Register
*/

import React     from 'react/addons';
import mixins    from 'backbone-react-component';

import api       from '../api';
import BaseClass from '../utils/react-class';

class Register extends BaseClass {

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
