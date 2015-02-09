/** @jsx React.DOM */

/**
 * @module Header.view
 * @exports {ReactClass}Header
 */

import React from 'react/addons';
import mixins from  'backbone-react-component';
import UserSettings from './user-settings';

/**
 * @class Header
 * Extended from React Class and BaseClass
 * View for site header
 */
export default React.createClass(

  class Header {

    get mixins() {
      return [mixins];
    }

    render() {
      var user = this.props.user;

      return (
        <header className="header--main">
          <i className="header__logo icon-already-cool"></i>
          <UserSettings user={user}/>
        </header>
      );
    }
  }.prototype
);
