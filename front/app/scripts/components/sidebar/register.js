/** @jsx React.DOM */

/**
* @module Register.view
* @exports <ReactClass>Register
*/

import React from 'react/addons';
import mixins from 'backbone-react-component';

import userDispatcher from './../../dispatcher/userDispatcher';

export default React.createClass(

  class Register {

    get mixins() {
      return [mixins];
    }

    getInitialState() {
      return {
        email: 'aze@aze.com',
        password: 'aze'
      }
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
          <h2>Create</h2>
          <form
            method="post"
            onSubmit={this.handleSubmit}
            className="form isVertical" >
            <div className="form__block">
              <input
                defaultValue={this.state.email}
                type="email"
                placeholder="email"
                ref="email"
                className="input isRounded isFullWidth" />
            </div>
            <div className="form__block">
              <input
                defaultValue={this.state.password}
                type="password"
                placeholder="password"
                ref="password"
                className="input isRounded isFullWidth" />
            </div>
            <div className="form__block">
              <input type="submit" className="button isWhite isFullWidth" />
            </div>
          </form>
        </nav>
      );
    }
  }.prototype
);
