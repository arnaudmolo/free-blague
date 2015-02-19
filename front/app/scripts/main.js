import * as to5 from '6to5/polyfill';

import React from 'react/addons';
import CommingSoonView from './components/coming-soon';
import TranslationActions from './actions/translation-actions';
import TranslationStore from './stores/translation-store';

TranslationActions.changeDomain(navigator.language);

React.render(<CommingSoonView />, document.getElementsByClassName('container')[0]);
