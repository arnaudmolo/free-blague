import React from 'react/addons';

import Writing from './writing';
import JokeList from './joke-list';
import MainJoke from './main-joke';
import Mute from './mute';
import Sidebar from './sidebar/sidebar';
import Header from './header/header';

/**
 * @class Content
 * Templates for Content
 */

export default class Content {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <div>
          <MainJoke />
          <JokeList />
          <Mute />
          <Writing />
        </div>
      </div>
    );
  }
}
