/**
* @module Requester
* @exports http static class
*/

import Promise from 'bluebird';

let XHR;

XHR = XMLHttpRequest;
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

  var promise, request, sent, processing, resolveSent, resolveProcess;

  if (data) {
    data = JSON.stringify(data);
  }

  request = new XHR();
  sent    = new Promise(function(resolve){resolveSent = resolve;});
  processing = new Promise(function(resolve){resolveProcess = resolve;});

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

    return request.send(data);
  });

  promise.sent = sent;
  promise.process = processing;

  return promise;
}

export default {
  get(url) {
    return xhr('GET', url);
  },
  put(url, data) {
    return xhr('PUT', url, data);
  },
  post(url, data) {
    return xhr('POST', url, data);
  },
  delete(url) {
    return xhr('DELETE', url);
  }
};
