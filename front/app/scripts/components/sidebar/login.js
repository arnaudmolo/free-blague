import React from 'react/addons';

/**
 * @class Login
 * Extended from React Class and BaseClass
 * View for Sidebar JokeList
 */

getStateFromStores() {
  return {
    email: 'aze@aze.com',
    password: 'aze'
  }
}

export default class Login React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(user);

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
