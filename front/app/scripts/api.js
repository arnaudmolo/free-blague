let API;

try {
  window;
  API = require('./front-api');
} catch(e) {
  API = require('./../../../server/utils/api-interface');
}

export default API;
