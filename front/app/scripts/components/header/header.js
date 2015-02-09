import React from 'react/addons';

import UserStore from './../../stores/user-store';

import UserSettings from './user-settings';

/**
 * @class Header
 * Extended from React Class and BaseClass
 * View for site header
 */

function getStateFromStores() {
  return {
    user: UserStore.getUserData()
  };
}

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    return (
      <header className="header--main">
        <i className="header__logo icon-already-cool"></i>
        <UserSettings user={this.state.user} />
      </header>
    );
  }

}
