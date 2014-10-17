/**
* @module Joke.model
* @exports Instance of User
*/

import Backbone from 'backbone';

import JokeList from './joke-list';
import api      from '../api';

var { Model } = Backbone;


/**
 * @class User
 * Extended from Backbone Model
 * Contains the User informations
 */

class User extends Model {

  /**
   * Set defaults values for a Joke.
   * Default values cames from the LocalStorage
   *
   * @return {Object} The default's User attributes.
   */

  defaults() {

    var user, res;

    user = JSON.parse(localStorage.getItem('user'));

    return {
      id       : user.id,
      userId   : user.userId,
      email    : user.email,
      password : user.password,
      logged   : false,
      jokes    : new JokeList(user.jokes)
    };
  }

  /**
   * Listen to himself to update the localStorage.
   * Set himself to logged if the Tocken isn't expired.
   * Update JokeCollection.
   *
   * @constructor
   * @this {User}
   * @return {Object} undefined
   */

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
        self
          .getJokes()
          .error(function(res){
            if (res.error.status === 401) {
              return self.login();
            };
          });
      }
    });

    return;
  }

  /**
   * Update the joke from the API and
   * add them to the <JokeCollection>#this.jokes
   *
   * @this {User}
   * @return <Promise>(jokes)
   */

  getJokes() {

    var self = this;

    return api
      .getUserJokes(this.get('userId'), this.get('id'))
      .then(function(res){
        self.get('jokes').add(res);
        return res;
      });
  }

  /**
   * Auth the user.
   * Set the user's properties (email, password, logged, id, userId).
   * Launch the this#getJokes
   *
   * @this {User}
   * @return <Promise>(AccessToken)
   */

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
          .getUserJokes(self.get('userId'), self.get('id'))
          .then(function(res){

            self.get('jokes').add(res);

            return res;
          });

        return res;
      });
  }

  /**
   * Create the user on server.
   * Launch the this#login
   *
   * @this {User}
   * @return <Promise>(userId)
   */

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

  logout() {

    var token;

    token = this.get('id');

    this.set('id', 0);
    this.set('email', '');
    this.set('userId', 0);
    this.set('logged', false);
    this.set('password', '');

    return api
      .logout(token)
  }

  toString() {
    return JSON.stringify(this.attributes);
  }

}

module.exports = new User();
