import { EventEmitter } from 'events';

import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from './../constants/app-constants';

export default TranslationStore = Object.assign({}, EventEmitter.prototype, {
  method() {
    console.log('ok');
  }
});
