import * as to5 from '6to5/polyfill';

import { createFactory } from 'react/addons';

import ContentView from './components/content';
import router from './router';

ContentView = createFactory(ContentView);

router
  .route('index', '/', function(req) {
    this.render(ContentView);
  })
  .attach(document.getElementsByClassName('content')[0])
  .captureClicks();
