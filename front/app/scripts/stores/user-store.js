import { EventEmitter } from 'events';

import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from './../constants/app-constants';

let UserStore, CHANGE_EVENT, _user;

CHANGE_EVENT = 'change';

export default UserStore = Object.assign({}, EventEmitter.prototype, {

});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {

  let action;

  console.log(payload);

});
