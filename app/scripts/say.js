'use strict';

module.exports = function(string){
  window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(string));
  return string;
};
