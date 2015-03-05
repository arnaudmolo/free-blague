import { EventEmitter } from 'events';

import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from './../constants/app-constants';

let PostStore, _jokes, _last_joke, nb;

const CHANGE_EVENT = 'change';

_jokes = {};
_last_joke = {};
nb = 0;

function update(existingJoke) {
  existingJoke.order = ++nb;
}

function create(rawJoke) {
  if (_jokes[rawJoke.id]) {
    update(_jokes[rawJoke.id]);
  }else{
    rawJoke.order = ++nb;
    _jokes[rawJoke.id] = rawJoke;
  }
  _last_joke = rawJoke;
}

function createAll(rawJokes) {
  rawJokes.forEach(create);
}

export default PostStore = Object.assign({}, EventEmitter.prototype, {

  getAll() {
    return _jokes;
  },

  getLastJoke() {
    return _last_joke;
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

create({
  content: 'La balgue par défaut',
  date: '2015-02-09T08:51:38.182Z',
  language: 'fr',
  id: 1,
  userId: 1,
  positiv: 100,
  negativ: 0
});

PostStore.dispatchToken = AppDispatcher.register(function(payload) {

  let action;

  if (payload.source === PayloadSources.SERVER_ACTION) {

    action = payload.action;

    switch(action.type) {
      case ActionTypes.ADD_RAW_JOKE:
        create(action.joke);
        PostStore.emitChange();
        break;

      case ActionTypes.ADD_RAW_JOKES:
        createAll(action.jokes);
        PostStore.emitChange();
        break;
    }

  }
});
