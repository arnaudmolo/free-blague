import React from 'react/addons';

import cleanString from './../utils/clean-string';
import appDispatcher from './../dispatcher/app-dispatcher';

/**
 * @module Writing.view
 * @exports {ReactClass}Writing
 */

function getStateFromStores() {
  return {
    content: '',
    writing: false
  }
}

export default class Writing extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentText = this.handleContentText.bind(this);
    this.showInput = this.showInput.bind(this);
    this.closeInput = this.closeInput.bind(this);
    this.state = getStateFromStores();
  }

  showInput(event) {
    event.preventDefault();
    this.setState({writing: true});
  }

  closeInput(event) {
    event.preventDefault();
    this.setState({writing: false});
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

    let form;

    if (this.state.writing) {
      form = (
        <div className="writing">
          <div className="close" onClick={this.closeInput}>
            <span>x</span>
          </div>
          <form onSubmit={this.handleSubmit} >
            <textarea
              ref="joke"
              rows="5"
              maxLength="300"
              placeholder="Write your joke..."></textarea>
            <button
              type="submit"
              className="button--red publish" > Publish my joke
            </button>
          </form>
        </div>
      );
    }

    return (
      <div>
        <a
          className="button--red publish"
          href=""
          onClick={this.showInput}>Publish my joke</a>
        { form }
      </div>
    );
  }
}
