
import api from './api';

var exports = function (){

  var form;

  form = document.getElementById('create-user');

  form.onsubmit = function(e){
    var email, password, user;
    e.preventDefault();

    email = e.target[0];
    password = e.target[1];

    user = {
      email: email.value,
      password: password.value
    };

    email.disabled = true;
    password.disabled = true;

    api.createUser(user);

  };
};

module.exports = exports;
