'use strict';

// var say            = require('./say');
var colorElements   = [],
  chuck             = require('./chuck'),
  toArray           = require('arrayify'),
  domReady          = require('detect-dom-ready'),
  colorize          = require('./colorize');

var randomizeRequest = function(){
  var time = '';
  chuck(function(data) {
    var joke = data.value.joke.replace('&quot;', '');
    time = Math.random() * 150000 + 3000 + joke.length + 100 ;
    console.log(joke);
    // say(joke);

    colorize(colorElements, joke);

    setTimeout(randomizeRequest, time);
  });
};

randomizeRequest();

domReady(function(){
  colorElements = toArray(document.getElementsByClassName('color'));
});
