import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/app-constants';

import API from './../API';

export default {
  login(user) {
    API
      .loginUser(user)
      .then(function(rawUser) {

        AppDispatcher
          .handleServerAction({
            type: ActionTypes.AUTH_LOGIN,
            user: Object.assign(user, rawUser)
          });
      });
  }
}
