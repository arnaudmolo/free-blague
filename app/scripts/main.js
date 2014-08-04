'use strict';

// var say            = require('./say');
var chuck           = require('./chuck'),
  hashStringToColor = require('./string-2-color'),
  domReady          = require('detect-dom-ready'),
  toArray           = require('arrayify'),
  colorElements     = [],
  invertColor       = require('./invert-color');

var randomizeRequest = function(){
  var time = '';
  chuck(function(data) {
    var joke = data.value.joke.replace('&quot;', '');
    time = Math.random() * 150000 + 3000 + joke.length + 100 ;
    console.log(joke);
    // say(joke);
    var partSize = joke.length / colorElements.length -1;
    document.body.style.backgroundColor = hashStringToColor(joke);

    colorElements.forEach(function(element){
      joke = joke.substr(partSize);
      var color = hashStringToColor(joke);
      element.style.backgroundColor = color;
      element.style.color = invertColor(color);
    });
    setTimeout(randomizeRequest, time);
  });
};

randomizeRequest();

domReady(function(){
  colorElements = toArray(document.getElementsByClassName('color'));
});
