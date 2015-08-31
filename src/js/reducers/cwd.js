import { CHANGE_DIRECTORY } from 'actions/types';
import listFiles from 'actions/list-files';
import { children } from 'api/files';
import store from 'store';

export default function(state = '/', action) {
  switch (action.type) {
    case CHANGE_DIRECTORY:
      children(action.dir).then(files => {
        store.dispatch(listFiles(files));
      });
      return action.dir;
    default:
      return state;
  }
}
