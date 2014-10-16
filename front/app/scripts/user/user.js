
import Backbone from 'backbone';

import JokeList from './joke-list';
import api      from '../api';

console.log('user', require('../api'));

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

    console.log(api);

    api
      .loginUser({
        email: this.get('email'),
        password: this.get('password')
      }).then(function(){
        self.logged = true;
        console.log("logged");
      });
  }
}

module.exports = new User;
