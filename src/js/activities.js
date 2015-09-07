import { enable } from 'actions/pick';
import store from 'store';

navigator.mozSetMessageHandler('activity', request => {
  if (request.source.name === 'pick') {
    store.dispatch(enable(request));
  }
});
