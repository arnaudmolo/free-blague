import React from 'react/addons';
import JokeActions from './../actions/joke-actions';

let cx;

cx = React.addons.classSet;

function getStateFromStore() {
  return {
    mute: JSON.parse(localStorage.getItem('mute'))
  };
}

export default class Mute extends React.Component {

  constructor(props) {
    super(props);
    this.toggleMute = this.toggleMute.bind(this);
    this.state = getStateFromStore();
  }

  toggleMute() {
    this.setState({mute: !this.state.mute});
    localStorage.setItem('mute', this.state.mute);
    JokeActions.toggleMute(this.state.mute);
  }

  render() {

    let classes;

    classes = cx({
      'icon-sound-on': !this.state.mute,
      'icon-sound-off': this.state.mute
    });

    return (
      <a
        onClick={this.toggleMute}
        title={this.statemute?'unmute':'mute'}
        className="toggle-sound"
      >
        <i className={classes}></i>
      </a>
    );
  }

}
