'use strict';

var input, api, say, content;

api     = require('../api');
say     = require('../say');
content = document.getElementById('content');
input   = document.getElementById('register');

// document.querySelector('.content').addEventListener('click', function(e){
//   input.blur();
// });

input.addEventListener('keyup', function keyup (e) {

  content.innerText = input.value;

  if (e.keyIdentifier === 'Enter') {

    input.removeEventListener('keyup', keyup);

    api
      .saveJoke(input.value)
      .then(say)
      .then(function(res){
        input.value = '';
        input.addEventListener('keyup', keyup);
        return res;
      })
      .error(function(err){
        console.error('error !', err);
      });

  }

  return;

}, false);
