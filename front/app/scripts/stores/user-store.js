import { EventEmitter } from 'events';

import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from './../constants/app-constants';

let UserStore, CHANGE_EVENT, _user;

CHANGE_EVENT = 'change';

_user = {};

export default UserStore = Object.assign({}, EventEmitter.prototype, {

  getAuthInformations() {
    return {
      email: _user.email,
      password: _user.password
    }
  },

  login() {
    Object.freeze(_user);
  }

});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {

  let action;

  console.log(payload);

});
