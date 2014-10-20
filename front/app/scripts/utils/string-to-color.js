
var djb2;

djb2 = function(str){

  var hash;

  hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }

  return hash;
}

module.exports = function(str) {

  var hash, r, g, b;

  hash = djb2(str);
  r = (hash & 0xFF0000) >> 16;
  g = (hash & 0x00FF00) >> 8;
  b = hash & 0x0000FF;

  return '#' + ('0' + r.toString(16)).substr(-2) + ('0' + g.toString(16)).substr(-2) + ('0' + b.toString(16)).substr(-2);
};
