'use strict';

var form, api;

form = document.getElementById('login');
api  = require('./api');

form.onsubmit = function(e){
  var email, password, user;
  e.preventDefault();

  email = e.target[0];
  password = e.target[1];

  user = {
    email: email.value,
    password: password.value
  };

  email.disabled = true
  password.disabled = true

  api.loginUser(user).then(function(res) {
    console.log("log", res);
  });

};
