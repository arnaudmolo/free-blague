import * as to5 from '6to5/polyfill';

import { createFactory } from 'react/addons';

import router from './router';

import CommingSoonView from './components/coming-soon';

CommingSoonView = createFactory(CommingSoonView);

router
  .route('index', '/', function() {
    this.render(CommingSoonView);
  })
  .attach(document.getElementsByClassName('container')[0])
  .captureClicks();
