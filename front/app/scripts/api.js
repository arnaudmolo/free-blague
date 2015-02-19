let API;

import front from './front-api';

if (window) {
  API = front;
} else {
  API = require('./../../../server/utils/api-interface');
}

export default API;
