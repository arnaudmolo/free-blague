'use strict';

var chuck = require('./chuck');
var say = require('./say');

chuck(function(data) {
  say(data.value.joke);
});

var randomizeRequest = function(){
  chuck(function(data) {
    var time =  Math.random() * 15000 + 3000 + data.value.joke.length + 100 ;
    console.log(time);
    say(data.value.joke);
    setTimeout(function(){
      randomizeRequest();
    }, time);
  });
};

randomizeRequest();
