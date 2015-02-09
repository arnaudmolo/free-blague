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

}
