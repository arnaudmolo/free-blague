import React from 'react/addons';
import JokeStore from './../stores/joke-store';
import JokeActions from './../actions/joke-actions';

let cx = React.addons.classSet;

function getStateFromStore() {
  return {
    mute: false
  }
}

export default class Mute extends React.Component {

  constructor(props) {
    super(props);
    this.toggleMute = this.toggleMute.bind(this);
    this.state = getStateFromStore();
  }

  toggleMute() {
    this.setState({mute: !this.state.mute});
    JokeActions.toggleMute(this.state.mute);
  }

  render() {

    return (<input
      type="submit"
      onClick={this.toggleMute}
      value=""
      className={
        cx({
          'unmute': this.state.mute,
          'mute': !this.state.mute
        })
      }
    />);
  }

}
