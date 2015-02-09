import React from 'react/addons';

import UserActions from './../../actions/user-actions';

function getStateFromStore() {
  return {
    email: 'aze@aze.com',
    password: 'aze'
  }
}

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStore();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();

    UserActions
      .register({
        email: this.state.email,
        password: this.state.password
      });
  }

  render() {
    return (
      <nav>
        <h1>Create</h1>
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
            ref="password"
          />
          <input type="submit" />
        </form>
      </nav>
    );
  }

}
