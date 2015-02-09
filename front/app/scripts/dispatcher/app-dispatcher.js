import { Dispatcher } from 'flux';
import { PayloadSources } from './../constants/app-constants';

export default Object.assign(new Dispatcher(), {

  handleServerAction(action) {
    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action
    });
  },

  handleViewAction(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action
    });
  }

});
