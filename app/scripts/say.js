'use strict';

module.exports = function(string){
  console.log(string);
  var msg = new window.SpeechSynthesisUtterance(string);
  window.speechSynthesis.speak(msg);
};
