/**
* @module Requester
* @exports http static class
*/

import Promise from 'bluebird';
import _       from 'underscore';

var {isObject} = _;

var XHR;

XHR = XMLHttpRequest || ActiveXObject;

/**
* Handle the parsing of the http responses
* @return {Array}(result, request)
*/

function parse(req) {

  var result;

  try {
    result = JSON.parse(req.responseText);
  } catch (e) {
    result = req.responseText;
  }

  return [result, req];

}

/**
* Send an XHR request
* @return {Promise}({Object}res)
*   Contains {Promise}promise#sent & {Promise}promise#process
*/

function xhr(type, url, data){

  var promise, request, sent, process, resolveSent, resolveProcess;

  if (isObject(data)) {
    data = JSON.stringify(data);
  }

  request = new XHR();
  sent    = new Promise(function(resolve){resolveSent = resolve;});
  process = new Promise(function(resolve){resolveProcess = resolve;});

  request.open(type, url, true);
  request.setRequestHeader('Content-type', 'application/json');

  /**
   * Resolve the Promise when request res status is 200 or 204
   */

  promise = new Promise(function(resolve, reject){
    request.onreadystatechange = function(){

      var res;

      if (request.readyState === 2) {
        resolveSent(2);
      }

      if (request.readyState === 3) {
        resolveProcess(2);
      }

      if (request.readyState === 4) {
        res = parse(request)[0];
        if (request.status === 200 || request.status === 204) {
          resolve(res);
        }else{
          reject(res);
        }
      }
    };

    request.send(data);

  });

  promise.sent = sent;
  promise.process = process;

  return promise;
}

class http {
  get(url) {
    return xhr('GET', url);
  }
  put(url, data) {
    return xhr('PUT', url, data);
  }
  post(url, data) {
    return xhr('POST', url, data);
  }
  delete(url) {
    return xhr('DELETE', url);
  }
}

module.exports = http.prototype;
