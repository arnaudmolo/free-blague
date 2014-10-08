'use strict';

var input, api, say, content, getById;

api     = require('../api');
say     = require('../say');
getById = document.getElementById.bind(document),
content = getById('content');
input   = getById('register');

input.addEventListener('keyup', function keyup (e) {

  content.innerText = input.value;

  if (e.keyIdentifier === 'Enter') {

    input.removeEventListener('keyup', keyup);

    api
      .saveJoke(input.value)
      .then(say)
      .then(function(res){
        content.innerText = input.value = '';
        input.addEventListener('keyup', keyup);
        return res;
      })
      .error(function(err){
        console.error('error !', err);
      });

  }

  return;

}, false);
