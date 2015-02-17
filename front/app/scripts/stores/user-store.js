import { EventEmitter } from 'events';

import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from './../constants/app-constants';

let UserStore, CHANGE_EVENT, _user;

CHANGE_EVENT = 'change';

function resetUser() {
  return {
    logged: false,
    jokes: []
  };
}

_user = {};

if (process.env.NODE_ENV === 'development') {
  _user = {
    email: 'john@doe.com',
    password: 'opensesame',
    avatar: 'arnaud.jpg'
  };
}

_user.logged = false;
_user.jokes = [];

function login(user) {
  Object.assign(_user, user);
  _user.logged = true;
  localStorage.setItem('user', JSON.stringify(_user));
}

function logout() {
  localStorage.removeItem('user');
  _user = resetUser();
}

export default UserStore = Object.assign({}, EventEmitter.prototype, {

  getAuthInformations() {
    return {
      email: _user.email,
      password: _user.password
    };
  },

  getUserData() {
    return _user;
  },

  getUserToken() {
    if (_user.logged) {
      return _user.id;
    }else{
      console.error('No token');
    }
  },

  getUserId() {
    return _user.userId;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(callback);
  }

});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {

  let action;

  if (payload.source === PayloadSources.SERVER_ACTION) {

    action = payload.action;

    switch(action.type) {
      case ActionTypes.AUTH_LOGIN:
        login(action.user);
        UserStore.emitChange();
        break;

      case ActionTypes.AUTH_LOGOUT:
        logout();
        UserStore.emitChange();
        break;

      case ActionTypes.ADD_RAW_JOKES_FROM_USER:
        _user.jokes = action.jokes;
        UserStore.emitChange();
        break;

    }

  }

});

let _temp = JSON.parse(localStorage.getItem('user'));

if (_temp !== null) {
  login(_temp);
}
