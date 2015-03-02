import * as to5 from 'babel/polyfill';

import React from 'react/addons';
import ComingSoon from './components/coming-soon';
import TranslationActions from './actions/translation-actions';

TranslationActions.changeDomain(navigator.language);

React.render(<ComingSoon />, document.getElementsByClassName('container')[0]);
