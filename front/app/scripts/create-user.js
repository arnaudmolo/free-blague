'use strict';

var form, api;

form = document.getElementById('create-user');
api  = require('./api');

form.onsubmit = function(e){
  var email, password, user;
  e.preventDefault();

  email = e.target[0].value;
  password = e.target[1].value;

  user = {
    email: email,
    password: password
  };

  api.createUser(user);
  form.style.display = 'none';
};
