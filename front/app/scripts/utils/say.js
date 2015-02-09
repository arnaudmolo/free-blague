
import Promise from 'bluebird';

import speechUtteranceChunker from '../../../bower_components/chunkify';

var voicesLoaded = new Promise(function(resolve, reject){
  window.speechSynthesis.onvoiceschanged = function(){
    resolve();
  };
});

/**
* Say a joke sentence by sentence.
*
* @param {Voice} The voice choosen.
* @param {String} A sentence.
*/

function sayOneSentence(voice, sentences){

  var utterance;

  if(sentences.length <= 0){
    return;
  }

  utterance = new window.SpeechSynthesisUtterance(sentences.shift());
  utterance.voice = voice;
  utterance.remaining = sentences;

  utterance.onend = function(event){
    sayOneSentence(this.voice, this.remaining);
  };

  // speechUtteranceChunker(utterance, {chunkLength: 300});
}

export default function say(string){
  voicesLoaded.then(function(){

    var voices, sentences;

    voices = window.speechSynthesis.getVoices();

    sentences = string.match( /[^\.!\?]+[\.!\?]+/g );
    sayOneSentence(voices[4], sentences);
  });

  return string;
}
