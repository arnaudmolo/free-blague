
var write, content;

content = document.getElementById('content');

var exports = function(string){
  content.innerText = string;
  return string;
};

module.exports = exports;
