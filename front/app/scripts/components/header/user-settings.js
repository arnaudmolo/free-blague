/** @jsx React.DOM */

/**
 * @module UserSettings.view
 * @exports {ReactClass}UserSettings
 */

import React from 'react/addons';
import mixins from  'backbone-react-component';

import userDispatcher from './../../dispatcher/userDispatcher';

/**
 * @class UserSettings
 * Extended from React Class and BaseClass
 * View for user settings
 */
export default React.createClass(

  class Settings {

    get mixins() {
      return [mixins];
    }

    /**
     * Invoked once, only on the client (not on the server),
     * immediately after the initial rendering occurs.
     * Listen to the User's logged attribute.
     *
     * @return {Object} undefined
     */

    componentDidMount() {
      this.getModel().on('all', () => {
        this.forceUpdate();
      });
      return;
    }

    // componentWillUnmount() {
    //   this.getModel().off(null, null, this);
    // }

    render() {
      var user, settingsStyle, settingsClassName, avatar;

      user = this.props.user;
      settingsStyle = {};
      settingsClassName = 'header__settings img img--rounded img--small img--bg-img'
      settingsClassName += user.get('logged') ? ' isLoggedIn' : ' isLoggedOut';

      if (avatar = user.get('avatar')) {
        settingsStyle = {
          backgroundImage: 'url(' + avatar + ')'
        };
      }

      return (
        <div className={settingsClassName} style={settingsStyle}>
          <i className="header__settings__icon icon-settings"></i>
        </div>
      );
    }
  }.prototype
);
