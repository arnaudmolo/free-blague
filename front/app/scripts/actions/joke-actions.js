import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/app-constants';

import API from './../api';

let JokeActions, timeoutId;

JokeActions = {
  launchRandom() {

    let relaunch = (e) => {
      if (e) {
        console.error(SyntaxError(e));
      };
      timeoutId = setTimeout(() => {
        this.launchRandom();
      }, 30000);
    }

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

  voteDown(jokeId) {

    AppDispatcher
      .handleViewAction({
        // type: ActionTypes.
      })

    API
      .updateJoke(jokeId, false)
      .done();
  },

  voteUp(jokeId) {
    API
      .updateJoke(jokeId, true)
      .done();
  }

}

export default JokeActions;

JokeActions.launchRandom();
