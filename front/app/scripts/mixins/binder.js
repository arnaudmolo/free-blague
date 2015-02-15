import {isFunction} from 'lodash';

export default {

  binder(context = this) {

    let method;

    for (method in context) {
      if (isFunction(context[method]) && method !== 'binder') {
        context[method] = context[method].bind(context);
      }
    }
  }
};
