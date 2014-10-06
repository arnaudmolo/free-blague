'use strict';

var input, api, say;

api = require('../api');
say = require('../say');

input = document.getElementById('register');

input.addEventListener('keyup', function keyup (e) {

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
