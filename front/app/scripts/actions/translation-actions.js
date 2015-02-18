import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/app-constants';

import API from './../api';

export default {
  changeDomain(domain) {
    return API
      .getLanguageDefinition(domain)
      .then(function(res){

        AppDispatcher
          .handleServerAction({
            type: ActionTypes.CHANGE_LANGUAGE,
            translation: res
          });
      });
  }
};
