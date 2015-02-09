import React from 'react/addons';

/**
 * @class UserSettings
 * Extended from React Class and BaseClass
 * View for user settings
 */

let cx;

cx = React.addons.classSet;

export default class Settings extends React.Component {

  render() {

    let user, settingsStyle, classes;

    user = this.props.user;
    settingsStyle = {};

    classes = cx({
      'header__settings img img--rounded img--small img--bg-img': true,
      'isLoggedIn': user.logged
    });

    if (user.avatar && user.logged) {
      settingsStyle = {
        backgroundImage: `url(/images/${user.avatar})`
      };
    }

    return (
      <div className={classes} style={settingsStyle}>
        <i className="header__settings__icon icon-settings"></i>
      </div>
    );
  }

}
