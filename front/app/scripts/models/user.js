
import Backbone from 'backbone';

import JokeList from './joke-list';
import api      from '../api';

var { Model } = Backbone;

class User extends Model {

  defaults() {

    var user, res;

    user = JSON.parse(localStorage.getItem('user'));

    res = {
      id: user.id,
      userId: user.userId,
      email: user.email,
      password: user.password,
      logged: false,
      jokes: new JokeList(user.jokes)
    };

    return res;
  }

  initialize() {

    var user, self;

    self = this;

    this.listenTo(this, 'change', function(){
      localStorage.setItem('user', this);
    });

    user = JSON.parse(localStorage.getItem('user'));

    setTimeout(function(){
      if (user.logged) {
        self.set('logged', true);
        self.getJokes();
      };
    });

    console.debug('initialize user');

    return;
  }

  getJokes() {

    var self = this;

    api
      .getUserJokes(this.get('userId'), this.get('id'))
      .then(function(res){
        self.get('jokes').add(res);
        return res;
      });
  }

  login() {

    var self;

    self = this;

    return api
      .loginUser({
        email: this.get('email'),
        password: this.get('password')
      }).then(function(res){

        self.set('logged', true);
        self.set('id', res.id);
        self.set('userId', res.userId);

        return res;
      }).then(function(res){

        api
          .getUserJokes()
          .then(function(res){

            self.get('jokes').add(res);

            return res;
          })

        return res;
      });
  }

  register() {

    return api
      .createUser({
        email: this.get('email'),
        password: this.get('password')
      })
      .then(function(res){
        return res;
      });
  }

  toString() {
    return JSON.stringify(this.attributes);
  }

}

module.exports = new User;
