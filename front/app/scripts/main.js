import { render, createElement } from 'react/addons';

import ContentView from './components/content';
import Content from './models/content';
import User from './models/user';

render(
  createElement(ContentView, {model: Content, user: User}),
  document.getElementsByClassName('content')[0]
);

console.info('v0.0.2');
