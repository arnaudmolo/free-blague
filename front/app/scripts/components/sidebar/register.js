import React from 'react/addons';

import UserActions from './../../actions/user-actions';
import UserStore from './../../stores/user-store';

function getStateFromStore() {
  return UserStore.getUserData();
}

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStore();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();

    UserActions
      .register({
        email: this.state.email,
        password: this.state.password
      });
  }

  handleInputChange(name) {
    return (event) => {
      this.setState({[name]: event.target.value});
    }
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
              value={this.state.email}
              onChange={this.handleInputChange('email')}
              type="email"
              placeholder="email"
              ref="email"
              className="input--rounded input--full-w" />
          </div>
          <div className="form__block">
            <input
              defaultValue={this.state.password}
              value={this.state.password}
              onChange={this.handleInputChange('passwor')}
              type="password"
              placeholder="password"
              ref="password"
              className="input--rounded input--full-w" />
          </div>
          <div className="form__block">
            <input type="submit" className="button--white button--full-w" />
          </div>
        </form>
      </nav>
    );
  }

}
