var ReactTools = require('react-tools');
var to5 = require("6to5");

module.exports = {
  process: function (src, filename) {
    src = ReactTools.transform(to5.transform(src, { filename: filename }).code);
    return src;
  }
};
