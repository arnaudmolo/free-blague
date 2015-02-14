import React from 'react/addons';
import Jed from 'jed';

import appDispatcher from './../dispatcher/app-dispatcher';
import inputChange from './../mixins/handle-input-change';
import binder from './../mixins/binder';

import API from './../api';

let cx, i18n, translate_options;

cx = React.addons.classSet;

import traduction_fr from './../../../../traductions/fr.json';

translate_options = {

  // You can choose to set the domain at instantiation time
  // If you don't, then "messages" will be used by default
  "domain" : "fr",

  // This callback is called when a key is missing
  "missing_key_callback" : function(key) {
    // Do something with the missing key
    // e.g. send key to web service or
    console.error('missing_key_callback', key);
  },

  // This is the translation data, which is often generated by
  // a po2json converter. You would ideally have one per locale
  // and only pull in the locale_data that you need.
  "locale_data" : {
    // This is the domain key
    "fr" : traduction_fr
  }
};

i18n = new Jed(traduction_fr);

console.log(i18n.translate("key_to_translate").fetch(3));

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

    let jokeLengthLimit, baseInputClass;

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
          <p><strong>{i18n.gettext("Receive a mail when the beta opens !")}</strong></p>
          <form className="coming-soon__form form isVertical" onSubmit={this.handleSubmit}>
            <div className="form__block">
              <div className="input-limited">
                <textarea
                  className={baseInputClass + " input--resize-v input--optional"}
                  type="text"
                  placeholder={i18n.gettext("Send us your best joke !")}
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
