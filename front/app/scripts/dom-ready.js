/**
 * Resolve Promise when the dom is ready
 *
 * @module domReady
 * @exports {Promise}
 */

import domReady from 'detect-dom-ready';
import Promise  from 'bluebird';

var domPromise = new Promise(function(resolve, reject){
  domReady(resolve);
});

module.exports = domPromise;
