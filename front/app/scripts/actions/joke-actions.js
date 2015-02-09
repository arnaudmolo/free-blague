import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/app-constants';

import API from './../api';

let JokeActions, timeoutId;

JokeActions = {
  launchRandom() {
    return API
      .getRandomJoke()
      .then((rawJoke) => {

        AppDispatcher
          .handleServerAction({
            type: ActionTypes.ADD_RAW_JOKE,
            joke: rawJoke
          });

        timeoutId = setTimeout(() => {
          this.launchRandom();
        }, 30000);
      });
  },
  stopRandom() {
    AppDispatcher
      .handleViewAction({
        type: ActionTypes.STOP_RANDOM,
      });
    clearTimeout(timeoutId);
  },
  toggleMute(muteState) {
    if (muteState) {
      this.launchRandom();
    }else{
      this.stopRandom();
    }
  }
}

export default JokeActions;

JokeActions.launchRandom();
