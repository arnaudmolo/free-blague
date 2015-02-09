import React from 'react/addons';

import UserActions from './../../actions/user-actions';
/**
 * @class Login
 * Extended from React Class and BaseClass
 * View for Sidebar JokeList
 */

function getStateFromStores() {
  return UserStore.getAuthInformations();
}

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    UserActions
      .login({
        email: this.state.email,
        password: this.state.password
      });

  }

  render() {
    return (
      <div>
        <h1>login</h1>
        <form method="post" onSubmit={this.handleSubmit}>
          <input
            defaultValue={this.state.email}
            type="email"
            placeholder="email"
            ref="email" />
          <input
            defaultValue={this.state.password}
            type="password"
            placeholder="password"
            ref="password"/>
          <input type="submit" />
        </form>
      </div>
    );
  }

}
