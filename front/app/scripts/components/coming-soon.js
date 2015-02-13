import React from 'react/addons';

import appDispatcher from './../dispatcher/app-dispatcher';


/**
 * @class ComingSoon
 * Templates for ComingSoon
 */

export default class ComingSoon extends React.Component {

  constructor(props) {
    super(props);
  }

  nameChange(event) {
    // CHANGE IT - just to see invalid look
    event.target.classList.toggle("isInvalid");
  }

  emailChange(event) {
    // CHANGE IT - just to see invalid look
    event.target.classList.toggle("isInvalid");
  }

  handleSubmit(event) {
    event.preventDefault();
    // do stuff
  }

  render() {
    var paragraph;

    paragraph = "Pour être informé de l'ouverture de la plateforme et obtenir une invitation à la version bêta :";

    return (
      <div className="coming-soon__container table table--full-w table--full-h">
        <header className="header--main header--absolute">
          <i className="header__logo icon-already-cool"></i>
        </header>
        <section className="coming-soon__content table__cell table--align-middle">
          <h2>Tribute to humour</h2>
          <h3>Coming soon.</h3>
          <p><strong>{paragraph}</strong></p>
          <form noValidate="novalidate" className="coming-soon__form form isVertical" onSubmit={this.handleSubmit}>
            <div className="form__block">
              <input className="input input--rounded input--big input--full-w" type="text" placeholder="Prénom" onChange={this.nameChange} />
            </div>
            <div className="form__block">
              <input className="input input--rounded input--big input--full-w" type="email" placeholder="Email" onChange={this.emailChange} />
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
