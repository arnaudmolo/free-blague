'use strict';

module.exports = function(url, callback){

  new window.Promise(function(resolve){
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(callback(data));
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  });
};
