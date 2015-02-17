import React from 'react/addons';

import JokeStore from './../stores/joke-store';
import JokeView from './Joke';

function getStateFromStores() {
  return {
    jokes: JokeStore.getAll()
  };
}

export default class JokeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    JokeStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    JokeStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {

    var jokes;

    jokes = Object.keys(this.state.jokes).map((d) => {
      d = this.state.jokes[d];
      return (<JokeView key={d.id} model={d} />);
    }).sort((b, a) => a.props.model.order - b.props.model.order);

    return (
      <ul className="jokes-list">
        { jokes }
      </ul>
    );
  }

}
