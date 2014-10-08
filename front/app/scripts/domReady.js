'use strict';

var domPromise, domReady, Promise;

domReady = require('detect-dom-ready');
Promise  = require('bluebird');

domPromise = new Promise(function(resolve, reject){
  domReady(function(){
    resolve()
  });
});

module.exports = domPromise;
