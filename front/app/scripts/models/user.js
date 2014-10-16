
import Backbone from 'backbone';

import JokeList from './joke-list';
import api      from '../api';

var { Model } = Backbone;

class User extends Model {
  defaults() {
    return {
      id: '',
      userId: 0,
      email: '',
      password: '',
      logged: false,
      jokes: new JokeList
    };
  }

  login() {

    var self;

    self = this;

    return api
      .loginUser({
        email: this.get('email'),
        password: this.get('password')
      }).then(function(){
        self.set('logged', true);
      });
  }

  register() {

    return api
      .createUser({
        email: this.get('email'),
        password: this.get('password')
      })
      .then(function(res){
        console.log('user created', res);
        return res;
      });
  }
}

module.exports = new User;
