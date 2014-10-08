'use strict';

var Promise, isObject, parse, XHR;

Promise = require('bluebird');
isObject = require('lodash').isObject;
XHR = XMLHttpRequest || ActiveXObject;

parse = function (req) {

  var result;

  try {
    result = JSON.parse(req.responseText);
  } catch (e) {
    result = req.responseText;
  }

  return [result, req];

};

var xhr = function(type, url, data){

  var promise;

  if (isObject(data)) {
    data = JSON.stringify(data);
  }

  promise = new Promise(function(resolve, reject){

    var request;

    request  = new XHR();

    request.open(type, url, true);
    request.setRequestHeader('Content-type', 'application/json');

    request.onreadystatechange = function(){

      var res;

      if (request.readyState === 4) {
        res = parse(request)[0];
        if (res.joke === null) {
          reject('the joke is null');
        }
        if (request.status === 200) {
          resolve(res);
        }else{
          reject(res);
        }
      }
    };

    request.send(data);

  });
  return promise;
};

module.exports = {
  get: function(src){
    return xhr('GET', src);
  },
  put: function(url, data){
    return xhr('PUT', url, data);
  },
  post: function(url, data){
    return xhr('POST', url, data);
  },
  delete: function(url){
    return xhr('DELETE', url);
  }
};
