import * as to5 from 'babel/polyfill';

import React from 'react/addons';
import ComingSoonView from './components/coming-soon';
import TranslationActions from './actions/translation-actions';
import TranslationStore from './stores/translation-store';

TranslationActions.changeDomain(navigator.language);

React.render(<ComingSoonView />, document.getElementsByClassName('container')[0]);
