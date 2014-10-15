
import Promise from 'bluebird';
import speechUtteranceChunker from '../../bower_components/chunkify';

var voicesLoaded = new Promise(function(resolve, reject){
  window.speechSynthesis.onvoiceschanged = function(){
    resolve();
  }
})

var exports = function(string){
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

module.exports = exports;
