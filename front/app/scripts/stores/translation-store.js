import Jed from 'jed';
import { EventEmitter } from 'events';

import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from './../constants/app-constants';

import translation from './../../../../traductions/en.json';

let TranslationStore, i18n, CHANGE_EVENT;

CHANGE_EVENT = 'change';
i18n = new Jed(translation);

export default TranslationStore = Object.assign(new Jed(translation), EventEmitter.prototype, {
  gettext(r) {
    return i18n.gettext(r);
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

TranslationStore.dispatchToken = AppDispatcher.register(function(payload) {

  let action;

  if (payload.source === PayloadSources.SERVER_ACTION) {

    action = payload.action;

    switch(action.type) {
      case ActionTypes.CHANGE_LANGUAGE:
        i18n = new Jed(action.translation);
        TranslationStore.emitChange();
    }
  }

});
