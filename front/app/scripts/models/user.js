/**
* @module User.model
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
   * Set defaults values for a User.
   * Default values cames from the LocalStorage
   *
   * @return {Object} The default's User attributes.
   */

  defaults() {

    var user, res;

    user = JSON.parse(localStorage.getItem('user'));

    if (user === null) {
      user = {};
    }

    return {
      id       : user.id || 0,
      userId   : user.userId || null,
      email    : user.email || '',
      password : user.password || '',
      logged   : false,
      jokes    : new JokeList(user.jokes || [])
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

    var user, self, jokes;

    this.listenTo(this, 'change', function(){
      localStorage.setItem('user', this);
    });

    user = JSON.parse(localStorage.getItem('user'));

    jokes = this.get('jokes');

    this.listenTo(jokes, 'add', function(){
      localStorage.setItem('user', this);
    });

    // setTimeout(function(){
    //   if (user.logged) {
    //     self.set('logged', true);
    //     self
    //       .getJokes()
    //       .error(function(res){
    //         if (res.error.status === 401) {
    //           return self.login();
    //         }
    //       });
    //   }
    // });

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

    return api
      .getUserJokes(this.get('userId'), this.get('id'))
      .then((res) => {
        this.get('jokes').add(res);
        return res;
      });
  }

  createJoke(joke) {

    return api
      .saveJoke(joke)
      .then((joke) => {
        this.get('jokes').add(joke);
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

  login() {

    return api
      .loginUser({
        email: this.get('email'),
        password: this.get('password')
      }).then((res) => {

        this.set('logged', true);
        this.set('id', res.id);
        this.set('userId', res.userId);

        return res;
      }).then((res) => {

        api
          .getUserJokes(this.get('userId'), this.get('id'))
          .then((res) => {

            this.get('jokes').add(res);

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
      .logout(token);
  }

  toString() {
    return JSON.stringify(this.attributes);
  }

}

module.exports = new User();
