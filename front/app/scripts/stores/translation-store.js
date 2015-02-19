import Jed from 'jed';
import { EventEmitter } from 'events';

import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from './../constants/app-constants';

function translationBuilder(locale_data) {
  return {
    domain: 'FR_fr',
    missing_key_callback(key) {
      console.info('error : ', key);
    },
    locale_data: {
      FR_fr: locale_data
    }
  }
}

let TranslationStore, i18n, CHANGE_EVENT, translation;

translation = {"":{}};

if (window) {
  translation = window.translation;
};

CHANGE_EVENT = 'change';

i18n = new Jed(translationBuilder(translation));

export default TranslationStore = Object.assign({}, EventEmitter.prototype, {
  gettext(r) {
    return i18n.gettext(r);
  },

  getTranslation() {
    return translation;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(callback);
  },

  executeOnce(callback) {
    this.once(CHANGE_EVENT, callback);
  }

});

TranslationStore.dispatchToken = AppDispatcher.register(function(payload) {

  let action;

  if (payload.source === PayloadSources.SERVER_ACTION) {

    action = payload.action;

    switch(action.type) {
      case ActionTypes.CHANGE_LANGUAGE:
        translation = action.translation;
        i18n = new Jed(translationBuilder(translation));
        TranslationStore.emitChange();
    }
  }

});
