import React from 'react/addons';

import inputChange from './../mixins/handle-input-change';
import i18n from './../stores/translation-store';

import TranslationActions from './../actions/translation-actions';

import { ExternalLinks } from './../constants/app-constants.js';

import API from 'API';
import Validate from '../utils/validate.js';

let cx, __;

cx = React.addons.classSet;
__ = i18n.gettext;

/**
 * @class ComingSoon
 * Templates for ComingSoon
 */

function getDefaultStates() {

  let posted;

  if (window) {
    posted = JSON.parse(localStorage.getItem('posted'))?true:false;
  } else {
    posted = false;
  }

  return {
    email: '',
    joke: '',
    posted: posted,
    hidden: true
  };
}

export default class ComingSoon extends React.Component {

  constructor(props) {
    super(props);
    this.state = getDefaultStates();
    this._onChange = this._onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    i18n.addChangeListener(this._onChange);
    this.state.hidden = false;
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
        if (window) {
          localStorage.setItem('posted', true);
        };

        this.setState(defaultStates);
      })
      .error(function(error){
        console.warn(error);
      });

  }

  handleLanguageChange(lang) {
    return function(){
      TranslationActions
        .changeDomain(lang);
    };
  }

  render() {

    let jokeLengthLimit, center;

    jokeLengthLimit = 350;

    if (this.state.posted) {
      center = (
        <div className="coming-soon__form form isVertical">
          <div className="form__block">
            <input type="submit" className="button button--big button--important button--full-w button--pressed" value={__("Y'll got it :)")} />
          </div>
        </div>
      );
    } else{
      center = (
        <form className="coming-soon__form form isVertical" onSubmit={this.handleSubmit}>
          <div className="form__block">
            <div className="input-limited">
              <textarea
                className={"input input--rounded input--big input--full-w input--resize-v input--optional"}
                type="text"
                placeholder={__("Send us your best joke !")}
                maxLength={jokeLengthLimit}
                onChange={this.handleInputChange('joke')}
                value={this.state.joke} />
              <span className="input-limited__limit">{jokeLengthLimit - this.state.joke.length}</span>
            </div>
          </div>
          <div className="form__block">
            <input
              className={"input input--rounded input--big input--full-w"}
              type="email"
              placeholder="Email"
              required="required"
              pattern={Validate.emailPattern}
              onChange={this.handleInputChange('email')}
              value={this.state.email} />
          </div>
          <div className="form__block">
            <input type="submit" className="button button--big button--important button--full-w" value={__("Get an invitation")} />
          </div>
        </form>
      );
    }

    return (
      <div className={cx({
        'coming-soon': true,
        'isPosted': this.state.posted,
        'isHidden': this.state.hidden
      })}>
        <div className="coming-soon__container table table--full-w table--full-h">
          <header className="header--main header--absolute">
            <i className="header__logo icon-already-cool"></i>
          </header>
          <section className="coming-soon__content">
            <header className="coming-soon__content_header">
              <h2>{__("Tribute to humour")}</h2>
              <h3>{__("Coming soon.")}</h3>
            </header>
            <p><strong>{__("Receive a mail when the beta opens !")}</strong></p>
            {center}
          </section>
        </div>
        <footer className="footer--main footer--absolute">
          <a className="footer__icon footer__icon--facebook" href={ExternalLinks.FACEBOOK_PAGE} target="_blank">
            <i className="icon-facebook"></i>
          </a>
          <a className="footer__icon footer__icon--twitter" href={ExternalLinks.TWITTER_PAGE} target="_blank">
            <i className="icon-twitter"></i>
          </a>
        </footer>
      </div>
    );
  }
}

Object.assign(ComingSoon.prototype, inputChange);
