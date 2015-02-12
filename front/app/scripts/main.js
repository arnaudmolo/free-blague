import * as to5 from '6to5/polyfill';

import { createFactory } from 'react/addons';

import router from './router';

// import ContentView from './components/content';

import CommingSoonView from './components/coming-soon';

// ContentView = createFactory(ContentView);

// router
//   .route('index', '/', function(req) {
//     this.render(ContentView);
//   })
//   .attach(document.getElementsByClassName('content')[0])
//   .captureClicks();

CommingSoonView = createFactory(CommingSoonView);

router
  .route('index', '/', function(req) {
    this.render(CommingSoonView);
  })
  .attach(document.getElementsByClassName('coming-soon')[0])
  .captureClicks();