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
          <h2>Login</h2>
          <form
            method="post"
            onSubmit={this.handleSubmit}
            className="form isVertical">
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
        </div>
      );
  }

}
