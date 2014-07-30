'use strict';

var chuck = require('./chuck');
var say = require('./say');
var hashStringToColor = require('./string-2-color');

chuck(function(data) {
  say(data.value.joke);
});

var randomizeRequest = function(){
  chuck(function(data) {
    var joke = data.value.joke.replace('&quot;', '');
    var time =  Math.random() * 15000 + 3000 + joke.length + 100 ;
    console.log(joke);
    say(joke);
    document.body.style.backgroundColor = hashStringToColor(joke);
    setTimeout(function(){
      randomizeRequest();
    }, time);
  });
};

randomizeRequest();

console.log(hashStringToColor('kouk'));
