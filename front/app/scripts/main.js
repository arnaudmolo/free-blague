'use strict';

var say, colorElements, toArray, domReady, colorize, api, timeout;

say             = require('./say');
colorElements   = [];
toArray         = require('arrayify');
domReady        = require('./domReady');
colorize        = require('./colorize');
api             = require('./api');

require('./register');
// require('./utils/follow-cursor');

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

randomizeRequest();

domReady
  .then(function(){

    colorElements = toArray(document.getElementsByClassName('color'));

    (function(){

      var muteButton, muted;

      muted = false;

      muteButton = document.getElementById('mute');

      muteButton.addEventListener('click', function(e){
        if (muted) {
          muted = false;
          muteButton.innerText = 'Mute';
          return randomizeRequest();
        }

        muted = true;
        muteButton.innerText = 'Unmute';
        clearTimeout(timeout);
      });

    })();

    return;
  });
