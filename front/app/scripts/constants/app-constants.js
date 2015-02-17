import keyMirror from 'keymirror';

export default Object.freeze({
  ActionTypes: keyMirror({
    'CREATE_JOKE': null,
    'UPDATE_JOKE': null,
    'ADD_RAW_JOKE': null,

    'ADD_RAW_JOKES_FROM_USER': null,

    'STOP_RANDOM': null,

    'AUTH_LOGIN': null,
    'AUTH_LOGOUT': null,

    'CHANGE_LANGUAGE': null

  }),
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
});
