import React from 'react/addons';

import appDispatcher from './../dispatcher/app-dispatcher';
import inputChange from './../mixins/handle-input-change';
import binder from './../mixins/binder';

import API from './../api';

let cx;

cx = React.addons.classSet;

/**
 * @class ComingSoon
 * Templates for ComingSoon
 */

function getDefaultStates() {
  return {
    email: '',
    joke: ''
  };
}

export default class ComingSoon extends React.Component {

  constructor(props) {
    super(props);
    this.state = getDefaultStates();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();

    API
      .newsletterSubscription(this.state.email, this.state.joke)
      .then((joke) => {

        let defaultStates = getDefaultStates();

        defaultStates.posted = true;

        this.setState(defaultStates);
      })
      .error((error) => {
        console.warn(error);
      });

  }

  render() {

    let paragraph, jokeLengthLimit, baseInputClass;

    paragraph = "Pour être informé de l'ouverture de la plateforme et obtenir une invitation à la version bêta :";
    baseInputClass = "input input--rounded input--big input--full-w";
    jokeLengthLimit = 350;

    return (
      <div className={
        cx({
          'coming-soon__container table table--full-w table--full-h': true,
          isPosted: this.state.posted
        })}
      >
        <header className="header--main header--absolute">
          <i className="header__logo icon-already-cool"></i>
        </header>
        <section className="coming-soon__content">
          <h2>Tribute to humour</h2>
          <h3>Coming soon.</h3>
          <p><strong>{paragraph}</strong></p>
          <form className="coming-soon__form form isVertical" onSubmit={this.handleSubmit}>
            <div className="form__block">
              <div className="input-limited">
                <textarea
                  className={baseInputClass + " input--resize-v input--optional"}
                  type="text"
                  placeholder="Envoyez votre meilleur blague !"
                  required="required"
                  maxLength={jokeLengthLimit}
                  onChange={this.handleInputChange('joke')}
                  value={this.state.joke} />
                <span className="input-limited__limit">{jokeLengthLimit - this.state.joke.length}</span>
              </div>
            </div>
            <div className="form__block">
              <input
                className={baseInputClass}
                type="email"
                placeholder="Email"
                required="required"
                onChange={this.handleInputChange('email')}
                value={this.state.email} />
            </div>
            <div className="form__block">
              <input type="submit" className="button button--big button--important button--full-w" value="Obtenir mon invitation" />
            </div>
          </form>
        </section>
      </div>
    );
  }
}

Object.assign(ComingSoon.prototype, inputChange);
