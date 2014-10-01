'use strict';

var input, api;

api = require('../api');

input = document.getElementById('register');

input.addEventListener('keyup', function keyup (e) {
  // console.log("log", e.keyIdentifier);
  if (e.keyIdentifier === 'Enter') {

    input.removeEventListener('keyup', keyup);

    api
      .saveJoke(input.value)
      .success(function(){
        input.addEventListener('keyup', keyup);
      })
      .error(function(err){
        console.log('error', err);
      })

  };
}, false);
