import React from 'react/addons';

import UserActions from './../../actions/user-actions';
import UserStore from './../../stores/user-store';

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
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();

    UserActions
      .login({
        email: this.state.email,
        password: this.state.password
      });

  }

  handleInputChange(name) {
    return (event) => {
      this.setState({[name]: event.target.value});
    };
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
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
              value={this.state.email}
              onChange={this.handleEmailChange}
              type="email"
              placeholder="email"
              ref="email"
              className="input--rounded input--full-w" />
          </div>
          <div className="form__block">
            <input
              defaultValue={this.state.password}
              value={this.state.password}
              onChange={this.handleInputChange('password')}
              type="password"
              placeholder="password"
              ref="password"
              className="input--rounded input--full-w" />
          </div>
          <div className="form__block">
            <input type="submit" className="button--white button--full-w" />
          </div>
        </form>
      </div>
    );
  }

}
