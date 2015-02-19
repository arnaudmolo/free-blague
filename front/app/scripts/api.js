let API;

if (window) {
  API = require('./front-api');
} else {
  API = require('./../../../server/utils/api-interface');
}

export default API;
