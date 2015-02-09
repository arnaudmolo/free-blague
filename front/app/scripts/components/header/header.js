/** @jsx React.DOM */

/**
 * @module Header.view
 * @exports {ReactClass}Header
 */

import React from 'react/addons';
import UserSettings from './user-settings';

/**
 * @class Header
 * Extended from React Class and BaseClass
 * View for site header
 */

export default class Header extends React.Component {

  render() {
    return (
      <header className="header--main">
        <i className="header__logo icon-already-cool"></i>
        <UserSettings user={this.props.user}/>
      </header>
    );
  }

}
