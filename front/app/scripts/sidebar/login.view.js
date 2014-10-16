/** @jsx React.DOM */

import React    from 'react';
import mixins   from 'backbone-react-component';

import api      from '../api';

class Login {

  getInitialState() {
    return {visible: true};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: true});
  }

  componentDidMount() {

    var user, self;

    self = this;

    user = this.getModel();

    user
      .listenTo(user, 'change:logged', function() {
        self.setState({visible: false});
      });

  }

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
    return this.state.visible
    ?(
      <div>
        <h1>login</h1>
        <form method="post" onSubmit={this.handleSubmit}>
          <input type="email"    value="john@doe.com" placeholder="email" ref="email"/>
          <input type="password" value="opensesame" placeholder="password" ref="password"/>
          <input type="submit" />
        </form>
      </div>
    ):(<span />);
  }

}

module.exports = React.createClass(Login.prototype);
