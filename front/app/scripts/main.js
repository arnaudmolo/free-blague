
import say        from './say';
import domReady   from './domReady';
import api        from './api';
import register   from './register';

import write      from './write';
import sidebar    from './sidebar';

var colorElements, timeout, mutation, muteButton;

muteButton = document.getElementById('mute');

domReady.then(function(){

  register();

  muteButton.addEventListener('click', function(){
    mutation(localStorage.getItem('muted') == 'true');
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

mutation(!(localStorage.getItem('muted') == 'true'));

var user = JSON.parse(localStorage.getItem('user'));

if (user) {
  api.loginUser(JSON.parse(localStorage.getItem('user')));
};
