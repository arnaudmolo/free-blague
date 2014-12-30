var ReactTools = require('react-tools');
var to5 = require("6to5");

module.exports = {
  process: function (src, filename) {
    return ReactTools.transform(to5.transform(src, { filename: filename }).code);;
  }
};
