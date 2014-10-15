
import hashStringToColor from './string-2-color';
import invertColor from './invert-color';

var exports = function(elements, joke){

  var partSize, color;

  partSize = joke.length / elements.length -1;

  elements.forEach(function(element){
    joke = joke.substr(partSize);
    color = hashStringToColor(joke);
    element.style.backgroundColor = color;
    element.style.color = invertColor(color);
  });
};

module.exports = exports;
