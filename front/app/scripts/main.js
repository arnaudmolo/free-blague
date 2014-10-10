'use strict';

var say, colorElements, toArray, domReady, colorize, api, timeout, mutation, muteButton;

say           = require('./say');
colorElements = [];
toArray       = require('arrayify');
domReady      = require('./domReady');
colorize      = require('./colorize');
api           = require('./api');
muteButton    = document.getElementById('mute');

domReady.then(function(){
  require('./register');
  require('./create-user');
  require('./login-user');
});
// // require('./utils/follow-cursor');

var randomizeRequest = function(){

  api
    .getRandomJoke()
    .then(function (res) {
      colorize(colorElements, res);
      return res;
    })
    .then(say);

  timeout = setTimeout(randomizeRequest, 10000);

  return;

};

mutation = function(muted){

  muted = !muted;
  localStorage.setItem('muted', muted);

  if (!muted) {
    muteButton.innerText = 'Mute';
    return randomizeRequest();
  }
  muteButton.innerText = 'Unmute';
  clearTimeout(timeout);

  return

};

mutation(!(localStorage.getItem('muted') == 'true'))

domReady
  .then(function(){
      muteButton.addEventListener('click', function(){
        mutation(localStorage.getItem('muted') == 'true');
        return;
      });

    return;

  });
