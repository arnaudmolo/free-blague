var ReactTools = require('react-tools');
var to5 = require("babel");

module.exports = {
  process: function (src, filename) {
    return ReactTools.transform(to5.transform(src, { filename: filename }).code);;
  }
};
