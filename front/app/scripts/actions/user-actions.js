import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/app-constants';

import UserStore from './../stores/user-store';

import API from './../API';

export default {
  login(user) {
    API
      .loginUser(user)
      .then((rawUser) => {

        AppDispatcher
          .handleServerAction({
            type: ActionTypes.AUTH_LOGIN,
            user: Object.assign(user, rawUser)
          });

        this
          .getUserJokesFromServer();

      });
  },

  register(user) {
    API
      .createUser(user)
      .then(() => {
        this
          .login(user);
      });
  },

  disconnect() {
    API
      .logout(UserStore.getUserToken())
      .then(function() {
        AppDispatcher
          .handleServerAction({
            type: ActionTypes.AUTH_LOGOUT
          });
      });
  },

  getUserJokesFromServer() {
    API
      .getUserJokes(UserStore.getUserId(), UserStore.getUserToken())
      .then((rawJokes) => {

        AppDispatcher
          .handleServerAction({
            type: ActionTypes.ADD_RAW_JOKES_FROM_USER,
            jokes: rawJokes
          });

      });
  }

};
