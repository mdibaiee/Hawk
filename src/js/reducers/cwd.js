import { CHANGE_DIRECTORY, REFRESH, SETTINGS } from 'actions/types';
import { children, CACHE } from 'api/files';
import store from 'store';
import { reportError, normalize } from 'utils';
import { listFiles } from 'actions/files-view';

export default function(state = '', action) {
  if (action.type === CHANGE_DIRECTORY) {
    changeTo(action.dir);

    return action.dir;
  }

  if (action.type === REFRESH) {
    CACHE[state] = null;
  }

  if (action.type === REFRESH || action.type === SETTINGS) {
    changeTo(state);

    return state;
  }

  return state;
}

function changeTo(dir) {
  dir = normalize(dir);
  children(dir, true).then(files => {
    store.dispatch(listFiles(files));
  }, reportError)
}
