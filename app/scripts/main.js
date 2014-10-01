'use strict';

// var say            = require('./say');
var colorElements = [],
  chuck           = require('./chuck'),
  toArray         = require('arrayify'),
  domReady        = require('detect-dom-ready'),
  colorize        = require('./colorize'),
  api             = require('./api'),
  register        = require('./register');

var randomizeRequest = function(){
  var time = '';

  api.getRandomJoke().success(function(res){
    // console.log(res);
  })
  .error(function(error){
    console.error(error);
  });

  // chuck(function(data) {
  //   var joke = data.value.joke.replace('&quot;', '');
  //   time = Math.random() * 150000 + 3000 + joke.length + 100 ;
  //   console.log(joke);
  //   // say(joke);

  //   colorize(colorElements, joke);

  //   setTimeout(randomizeRequest, time);
  // });
};

randomizeRequest();

domReady(function(){
  colorElements = toArray(document.getElementsByClassName('color'));
});
