'use strict';

var Promise, speechUtteranceChunker;

Promise = require('bluebird');
speechUtteranceChunker = require('../../bower_components/chunkify');

var voicesLoaded = new Promise(function(resolve, reject){
  window.speechSynthesis.onvoiceschanged = function(){
    resolve();
  }
})

module.exports = function(string){
  // voices[3] = espagne
  // voices[4] = france
  voicesLoaded.then(function(){
    var voices, utterance;
    voices = window.speechSynthesis.getVoices();
    utterance = new window.SpeechSynthesisUtterance(string)
    utterance.voice = voices[4];
    speechUtteranceChunker(utterance, {chunkLength: 300});
  });

  return string;
};
