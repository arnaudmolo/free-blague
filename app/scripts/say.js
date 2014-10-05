'use strict';

module.exports = function(string){
  var msg = new window.SpeechSynthesisUtterance(string);
  window.speechSynthesis.speak(msg);
  return string;
};
