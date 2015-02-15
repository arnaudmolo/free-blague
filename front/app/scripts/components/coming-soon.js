import React from 'react/addons';
import Jed from 'jed';

import inputChange from './../mixins/handle-input-change';
import i18n from './../stores/translation-store';

import TranslationActions from './../actions/translation-actions';

import API from './../api';

let cx, __;

cx = React.addons.classSet;
__ = i18n.gettext;

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

TranslationActions
  .changeDomain(navigator.language);

export default class ComingSoon extends React.Component {

  constructor(props) {
    super(props);
    this.state = getDefaultStates();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    i18n.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    i18n.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.forceUpdate();
  }

  handleSubmit(event) {

    event.preventDefault();

    API
      .newsletterSubscription(this.state.email, this.state.joke)
      .then(() => {

        let defaultStates = getDefaultStates();

        defaultStates.posted = true;

        this.setState(defaultStates);
      })
      .error((error) => {
        console.warn(error);
      });

  }

  handleLanguageChange(lang) {
    return (event) => {
      TranslationActions
        .changeDomain(lang);
    }
  }


  render() {

    return (
      <div className={
        cx({
          'table table--full-w table--full-h': true,
          isPosted: this.state.posted
        })
      }>
        <header className="header--main header--absolute">
          <i className="header__logo icon-already-cool"></i>
        </header>
        <section className="coming-soon__content table__cell table--align-middle">
          <h2>{__("Tribute to humour")}</h2>
          <h3>{__("Coming soon.")}</h3>
          <p><strong>{__("Receive a mail when the beta opens !")}</strong></p>
          <form className="coming-soon__form form isVertical" onSubmit={this.handleSubmit}>
            <div className="form__block">
              <input
                className="input input--rounded input--big input--full-w"
                type="text"
                placeholder={__("Send us your best joke !")}
                required
                onChange={this.handleInputChange('joke')}
                value={this.state.joke} />
            </div>
            <div className="form__block">
              <input className="input input--rounded input--big input--full-w" type="email" placeholder="Email" required onChange={this.handleInputChange('email')} value={this.state.email}/>
            </div>
            <div className="form__block">
              <input type="submit" className="button button--big button--important button--full-w" value={__("Get an invitation")} />
            </div>
          </form>
          <button onClick={this.handleLanguageChange('fr')}>Fr</button><button onClick={this.handleLanguageChange('en')}>En</button>
        </section>
      </div>
    );
  }
}

Object.assign(ComingSoon.prototype, inputChange);
