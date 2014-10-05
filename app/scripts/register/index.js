'use strict';

var input, api, say;

api = require('../api');
say = require('../say');


input = document.getElementById('register');

input.addEventListener('keyup', function keyup (e) {
  // console.log("log", e.keyIdentifier);
  if (e.keyIdentifier === 'Enter') {

    input.removeEventListener('keyup', keyup);

    api
      .saveJoke(input.value)
      .then(say)
      .then(function(mes){
        input.value = '';
        input.addEventListener('keyup', keyup);
      })
      .error(function(err){
        console.error(err);
      });

  };
}, false);
