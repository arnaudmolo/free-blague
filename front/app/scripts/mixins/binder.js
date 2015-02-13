import {isFunction} from 'lodash';

export default {

  binder(context = this) {

    let method;
    console.log(Object.getOwnPropertyNames(context));
    for (method in context) {
      console.log(method);
      if (isFunction(context[method]) && method !== 'binder') {
        context[method] = context[method].bind(context);
      };
    }
  }
}
