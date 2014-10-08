'use strict';

module.exports = function(color){
  color = color.substring(1);
  color = parseInt(color, 16);
  color = 0xFFFFFF ^ color;
  color = color.toString(16);
  color = ('000000' + color).slice(-6);
  color = '#' + color;
  return color;
};
