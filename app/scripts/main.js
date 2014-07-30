'use strict';

var chuck = require('./chuck');
var say = require('./say');

chuck(function(data) {
  say(data.value.joke);
});

var randomizeRequest = function(){
  chuck(function(data) {
    var joke = data.value.joke;
    var time =  Math.random() * 15000 + 3000 + joke.length + 100 ;
    say();
    document.body.style.backgroundColor = hashStringToColor(joke);
    setTimeout(function(){
      randomizeRequest();
    }, time);
  });
};

randomizeRequest();

function djb2(str){
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  return hash;
}

function hashStringToColor(str) {
  var hash = djb2(str);
  var r = (hash & 0xFF0000) >> 16;
  var g = (hash & 0x00FF00) >> 8;
  var b = hash & 0x0000FF;
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}

console.log(hashStringToColor('kouk'));
