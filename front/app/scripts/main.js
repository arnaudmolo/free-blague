import { render, createElement } from 'react/addons';

import ContentView from './components/content';
import Content     from './models/content';

console.log(Content);

render(
  createElement(ContentView, {model: Content}),
  document.getElementsByClassName('content')[0]
);

console.info('v0.0.2');
