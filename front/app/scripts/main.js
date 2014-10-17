/*global _:false */

import say        from './say';
import domReady   from './dom-ready';
import api        from './api';
import write      from './write';
import sidebar    from './sidebar';

var timeout, mutation, muteButton;

muteButton = document.getElementById('mute');

domReady.then(function(){
  muteButton.addEventListener('click', function(){
    mutation(localStorage.getItem('muted') === 'true');
    return;
  });
});

var randomizeRequest = function(){

  api
    .getRandomJoke()
    .then(say)
    .then(write);

  timeout = setTimeout(randomizeRequest, 10000);

  return;

};

mutation = function(muted){
  localStorage.setItem('muted', muted = !muted);

  if (!muted) {
    muteButton.innerText = 'Mute';
    return randomizeRequest();
  }

  while(speechSynthesis.speaking){
    speechSynthesis.cancel();
  }

  muteButton.innerText = 'Unmute';
  clearTimeout(timeout);

  return;

};

mutation((localStorage.getItem('muted') !== 'true'));
