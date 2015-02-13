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

    let paragraph;

    paragraph = "Pour être informé de l'ouverture de la plateforme et obtenir une invitation à la version bêta :";

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
        <section className="coming-soon__content table__cell table--align-middle">
          <h2>Tribute to humour</h2>
          <h3>Coming soon.</h3>
          <p><strong>{paragraph}</strong></p>
          <form className="coming-soon__form form isVertical" onSubmit={this.handleSubmit}>
            <div className="form__block">
              <input
                className="input input--rounded input--big input--full-w"
                type="text"
                placeholder="Envoyez votre meilleur blague !"
                required
                onChange={this.handleInputChange('joke')}
                value={this.state.joke} />
            </div>
            <div className="form__block">
              <input className="input input--rounded input--big input--full-w" type="email" placeholder="Email" required onChange={this.handleInputChange('email')} value={this.state.email}/>
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
