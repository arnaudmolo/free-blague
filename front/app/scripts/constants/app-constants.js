import keyMirror from 'keymirror';

export default Object.freeze({
  ActionTypes: keyMirror({
    'CREATE_JOKE': null,
    'ADD_RAW_JOKE': null,
    'STOP_RANDOM': null
  }),
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
});
