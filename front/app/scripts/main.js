import * as to5 from 'babel/polyfill';

import React from 'react/addons';
import Content from './components/content';
import TranslationActions from './actions/translation-actions';

TranslationActions.changeDomain(navigator.language);

React.render(<Content />, document.getElementsByClassName('container')[0]);
