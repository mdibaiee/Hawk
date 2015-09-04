import { CHANGE_DIRECTORY, REFRESH, SETTINGS } from 'actions/types';
import listFiles from 'actions/list-files';
import { children } from 'api/files';
import store from 'store';

export default function(state = '', action) {
  if (action.type === CHANGE_DIRECTORY) {
    children(action.dir).then(files => {
      store.dispatch(listFiles(files));
    });
    return action.dir;
  }

  if (action.type === REFRESH || action.type === SETTINGS) {
    children(state).then(files => {
      store.dispatch(listFiles(files));
    });
    return state;
  }

  return state;
}
