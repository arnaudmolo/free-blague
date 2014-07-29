'use strict';

var chuck = require('./chuck');
var say = require('./say');

chuck(function(data) {
  say(data.value.joke);
});

var randomizeRequest = function(){
  var time =  Math.random() * 100000 + 3000;
  setTimeout(function(){
    console.log(time);
    chuck(function(data) {
      say(data.value.joke);
      randomizeRequest();
    });
  }, time);
};

randomizeRequest();
