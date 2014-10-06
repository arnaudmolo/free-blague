'use strict';

var hashStringToColor, invertColor;

hashStringToColor = require('./string-2-color');
invertColor       = require('./invert-color');

module.exports = function(elements, joke){

  var partSize, color;

  partSize = joke.length / elements.length -1;

  elements.forEach(function(element){
    joke = joke.substr(partSize);
    color = hashStringToColor(joke);
    element.style.backgroundColor = color;
    element.style.color = invertColor(color);
  });
};
