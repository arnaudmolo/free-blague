
import Promise from 'bluebird';
import merge   from 'react/lib/merge';

var _callbacks, _promises;

_callbacks = [];
_promises  = [];

export default class Dispatcher {

  /**
   * Register a Store's callback so that it may be invoked by an action.
   * @param {function} callback The callback to be registered.
   * @return {number} The index of the callback within the _callbacks array.
   */

  register(callback) {
    return _callbacks.push(callback);
  }

  dispatch(payload) {

    // First create array of promises for callbacks to reference.

    var resolves, rejects;

    resolves = [];
    rejects  = [];

    _promises = _callbacks.map(function(_, i) {
      new Promise(function(resolve, reject) {
        resolves[i] = resolve;
        rejects[i]  = reject;
      })
    });

    // Dispatch to callbacks and resolve/reject promises.

    _callbacks.forEach(function(callback, i) {

      // Callback can return an obj, to resolve, or a promise, to chain.
      // See waitFor() for why this might be useful.

      Promise.resolve(callback(payload)).then(function(){
        resolves[i](payload);
      }, function(){
        rejects[i](new Error('Dispatcher callback unsuccessfull'));
      });
    });

    _promises = [];

  }

}
