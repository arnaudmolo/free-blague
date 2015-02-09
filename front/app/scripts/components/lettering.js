import React from 'react/addons';

/**
 * @class Lettering
 * Templates for the main joke
 */

let animationDuration = 2000;

function getStateFromStores() {
  return {
    string: ''
  }
}

export default class Lettering extends React.Component {
  constructor(props) {
    super(props);
    this.state = getStateFromStores();
  }
  render() {

    let lettering;

    lettering = [];

    for (let i = 0; i <= this.props.string.length - 1; i++) {
      lettering.push(<span key={Math.random()} style={
        {
          WebkitAnimationDelay: animationDuration / this.props.string.length * i + "ms"
        }
      }>{this.props.string[i]}</span>);
    };

    return (
      <span className="lettering-container">
        {lettering}
      </span>
    );

  }
}
