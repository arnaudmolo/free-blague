import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/app-constants';

import API from './../api';

let JokeActions, timeoutId;

JokeActions = {
  launchRandom() {

    let relaunch = (e) => {
      if (e) {
        console.error(new SyntaxError(e));
      }
      timeoutId = setTimeout(() => {
        this.launchRandom();
      }, 30000);
    };

    return API
      .getRandomJoke()
      .then((rawJoke) => {
        AppDispatcher
          .handleServerAction({
            type: ActionTypes.ADD_RAW_JOKE,
            joke: rawJoke
          });
          relaunch();
      }, relaunch);
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
  },

  voteDown(joke) {

    AppDispatcher
      .handleViewAction({
        type: ActionTypes.UPDATE_JOKE
      });

    API
      .updateJoke(joke.id, false)
      .done();
  },

  voteUp(joke) {
    API
      .updateJoke(joke.id, true)
      .done();
  }

};

export default JokeActions;
