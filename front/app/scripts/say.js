'use strict';

var Promise;

Promise = require('bluebird');

var voicesLoaded = new Promise(function(resolve, reject){
  window.speechSynthesis.onvoiceschanged = function(){
    console.log('voicesLoaded');
    resolve();
  }
})

module.exports = function(string){
  // voices[3] = espagne
  // voices[4] = france
  voicesLoaded.then(function(){
    var voices, msg;
    voices = window.speechSynthesis.getVoices();
    msg = new window.SpeechSynthesisUtterance(string)
    msg.voice = voices[4];
    window.speechSynthesis.speak(msg);
    console.log("log", msg);
  });

  return string;
};
