import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/app-constants';

export default {
  login(user) {
    console.log('log de l\'user', user);
  }
}
