import { EventEmitter } from 'events';

import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from './../constants/app-constants';

let UserStore, CHANGE_EVENT, _user;

CHANGE_EVENT = 'change';

_user = {};

if (process.env.NODE_ENV === 'development') {
  _user = {
    email: 'john@doe.com',
    password: 'opensesame',
    avatar: 'arnaud.jpg'
  }
};

_user.logged = false;
_user.jokes = [];

function login(user) {
  Object.assign(_user, user);
  _user.logged = true;
  Object.freeze(_user);
}

export default UserStore = Object.assign({}, EventEmitter.prototype, {

  getAuthInformations() {
    return {
      email: _user.email,
      password: _user.password
    }
  },

  getUserData() {
    return _user;
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
    }

  };

});
