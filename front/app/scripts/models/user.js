/**
* @module User.model
* @exports Instance of User
*/

import { Model } from 'backbone';

import JokeList from './joke-list';
import api from './../api';
import appDispatcher from './../dispatcher/appDispatcher';
import userDispatcher from './../dispatcher/userDispatcher';

/**
 * @class User
 * Extended from Backbone Model
 * Contains the User informations
 */

export default new class User extends Model {

  /**
   * Set defaults values for a User.
   * Default values cames from the LocalStorage
   *
   * @return {Object} The default's User attributes.
   */

  defaults() {

    var user, res;

    user = JSON.parse(localStorage.getItem('user'));

    if (user === null || user === undefined) {
      user = {
        id       : 0,
        userId   : undefined,
        email    : '',
        password : '',
        logged   : false,
        jokes    : []
      };
    }

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

    var jokes;

    jokes = this.get('jokes');

    this.dispatchJokesToken = appDispatcher.register(this.dispatchJokes.bind(this));
    this.dispatchUserToken  = userDispatcher.register(this.dispatchUser.bind(this));

    this.on('all', () => {
      localStorage.setItem('user', this);
    });

    return;
  }

  dispatchJokes(payload) {

    switch(payload.actionType){
      case 'add-joke':
        this.createJoke(payload.joke);
    }

  }

  dispatchUser(payload) {

    switch(payload.actionType){
      case 'user-login':
        return this.login(payload.user);
      case 'user-logout':
        return this.logout();
      case 'user-register':
        return this.register(payload.user);
    }

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

  createJoke(joke) {

    return api
      .saveJoke(joke)
      .then((joke) => {

        this.get('jokes').add(joke);

        appDispatcher
          .dispatch({
            payload: 'show-writing',
            value: false
          });

        return joke;

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

  login({email, password}) {

    return api
      .loginUser({
        email: email,
        password: password
      }).then((res) => {

        this.set({
          id: res.id,
          userId: res.userId,
          logged: true,
          email
        });

        return api
          .getUserJokes(this.get('userId'), this.get('id'))
          .then((res) => {
            this.get('jokes').add(res);
            return res;
          });

      });
  }

  /**
   * Create the user on server.
   * Launch the this#login
   *
   * @this {User}
   * @return <Promise>(userId)
   */

  register({email, password}) {

    var _user;

    _user = { email, password };

    return api
      .createUser(_user)
      .then((res) => {
        this.login(_user);
        return res;
      });
  }

  logout() {

    var token;

    token = this.get('id');

    this.set({
      id: 0,
      email: '',
      userId: 0,
      logged: false
    });

    return api.logout(token);
  }

  toString() {
    return JSON.stringify(this.attributes);
  }

};
