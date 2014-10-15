
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

  var promise, request;

  if (_.isObject(data)) {
    data = JSON.stringify(data);
  }

  request  = new XHR();

  request.open(type, url, true);
  request.setRequestHeader('Content-type', 'application/json');

  promise = {};

  promise = _.extend(promise, new Promise(function(resolve, reject){

    promise.sent = new Promise(function(resolveSent){

      promise.process = new Promise(function(resolveProcess){

        request.onreadystatechange = function(){

          var res;

          if (request.readyState === 2) {

            resolveSent(request.readyState);

          }else if(request.readyState === 3){

            resolveProcess(request.readyState);

          }else if (request.readyState === 4) {

            res = parse(request)[0];
            if (res.joke === null) {
              reject('the joke is null');
            }
            if (request.status === 200) {
              resolve(res);
            }else{
              reject(res);
            }

          };
          request.send(data);
        };
      });
    });
  }));

  console.log(promise);

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
