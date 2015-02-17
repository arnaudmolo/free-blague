import React from 'react/addons';

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
    joke: '',
    posted: JSON.parse(localStorage.getItem('posted'))?true:false
  };
}

TranslationActions
  .changeDomain(navigator.language);

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
        localStorage.setItem('posted', true);

        this.setState(defaultStates);
      })
      .error((error) => {
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

    let jokeLengthLimit, baseInputClass, center;

    baseInputClass = "input input--rounded input--big input--full-w";
    jokeLengthLimit = 350;

    if (this.state.posted) {
      center = (
        <div className="form__block">
          <input type="submit" className="button button--big button--important button--full-w" value={__("Y'll got it :)")} />
        </div>
      );
    }else{
      center = (
        <form className="coming-soon__form form isVertical" onSubmit={this.handleSubmit}>
          <div className="form__block">
            <div className="input-limited">
              <textarea
                className={baseInputClass + " input--resize-v input--optional"}
                type="text"
                placeholder={__("Send us your best joke !")}
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
            <input type="submit" className="button button--big button--important button--full-w" value={__("Get an invitation")} />
          </div>
        </form>
      );
    }

    return (
      <div className={cx({
        'coming-soon': true,
        isPosted: this.state.posted
      })}>
        <div className="coming-soon__container table table--full-w table--full-h">
          <header className="header--main header--absolute">
            <i className="header__logo icon-already-cool"></i>
          </header>
          <section className="coming-soon__content">
            <h2 className="animation-target">{__("Tribute to humour")}</h2>
            <h3>{__("Coming soon.")}</h3>
            <p><strong>{__("Receive a mail when the beta opens !")}</strong></p>
            {center}
            <button onClick={this.handleLanguageChange('fr')}>Fr</button><button onClick={this.handleLanguageChange('en')}>En</button>
          </section>
        </div>
      </div>
    );
  }
}

Object.assign(ComingSoon.prototype, inputChange);
