import React from 'react/addons';

import cleanString from './../utils/clean-string';
import appDispatcher from './../dispatcher/app-dispatcher';
import JokeAction from './../actions/joke-actions';

/**
 * @module Writing.view
 * @exports {ReactClass}Writing
 */

 function getStateFromStores() {
  return {
    content: ''
  }
 }

export default class Writing extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentText = this.handleContentText.bind(this);
    this.state = getStateFromStores();
  }

  close() {
    appDispatcher
      .handleViewAction({
        actionType: 'show-writing',
        value: false
      });
  }

  handleContentText(event) {
    this.setState({content: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault();

    console.log({
      actionType: 'add-joke',
      joke: cleanString(this.state.content)
    });
  }

  render() {

    return (
        <div className="writing">
          <div className="close" onClick={this.close}>
            <span>x</span>
          </div>
          <form onSubmit={this.handleSubmit} >
            <textarea
              rows="5"
              value={this.state.content}
              onChange={this.handleContentText}
              maxLength="300"
              placeholder="Write your joke..."></textarea>
            <button
              type="submit"
              className="button red publish" >Publish my joke</button>
          </form>
        </div>
    );
  }

}
