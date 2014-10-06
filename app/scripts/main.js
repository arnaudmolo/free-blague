'use strict';

var say, colorElements, toArray, domReady, colorize, api;

say             = require('./say');
colorElements   = [];
toArray         = require('arrayify');
domReady        = require('detect-dom-ready');
colorize        = require('./colorize');
api             = require('./api');

require('./register');

var randomizeRequest = function(){

  api
    .getRandomJoke()
    .then(function (res) {
      colorize(colorElements, res);
      return res;
    })
    // .then(say);

  // setTimeout(randomizeRequest, 4000);

  return;

};

randomizeRequest();

domReady(function(){
  colorElements = toArray(document.getElementsByClassName('color'));
  return;
});
