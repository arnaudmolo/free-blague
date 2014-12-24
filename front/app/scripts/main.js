// import sidebar  from './sidebar';
import ContentView from './components/content';
import Content     from './models/content';

React.render(
  <Content model={Content} />,
  document.getElementsByClassName('content')[0]
);

console.info('v0.0.2');
