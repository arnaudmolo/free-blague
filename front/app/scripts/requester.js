
import Promise from 'bluebird';
import _       from 'lodash';

var parse, XHR, exports;

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

  var promise, request, sent, process, resolveSent, resolveProcess;

  if (_.isObject(data)) {
    data = JSON.stringify(data);
  }

  request  = new XHR();

  sent = new Promise(function(resolve){
    resolveSent = resolve;
  });

  process = new Promise(function(resolve){
    resolveProcess = resolve;
  });

  request.open(type, url, true);
  request.setRequestHeader('Content-type', 'application/json');

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
        if (request.status === 200) {
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
};

exports = {
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

module.exports = exports;
