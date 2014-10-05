'use strict';

var say           = require('./say'),
  colorElements   = [],
  chuck           = require('./chuck'),
  toArray         = require('arrayify'),
  domReady        = require('detect-dom-ready'),
  colorize        = require('./colorize'),
  api             = require('./api'),
  register        = require('./register');

var randomizeRequest = function(){

  api
    .getRandomJoke()
    .then(function (res) {
      colorize(colorElements, res);
      return res;
    })
    .then(say);

    setTimeout(randomizeRequest, 4000);
  // });
};

randomizeRequest();

domReady(function(){
  colorElements = toArray(document.getElementsByClassName('color'));
});
