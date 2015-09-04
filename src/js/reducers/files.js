import { LIST_FILES, RENAME_FILE, DELETE_FILE, CREATE_FILE } from 'actions/types';
import { refresh } from 'actions/files-view';
import { move, sdcard, createFile, createDirectory } from 'api/files';
import { show } from 'actions/dialog';
import store, { bind } from 'store';
import { reportError } from 'utils';

let boundRefresh = bind(refresh());

export default function(state = [], action) {
  if (action.type === LIST_FILES) {
    return action.files;
  }

  if (action.type === CREATE_FILE) {
    let fn = action.directory ? createDirectory : createFile;
    fn(action.path).then(boundRefresh, reportError);

    return state;
  }

  if (action.type === RENAME_FILE) {
    let file = state[action.file];

    move(file, (file.path || '') + action.name).then(boundRefresh, reportError);

    return state;
  }

  if (action.type === DELETE_FILE) {
    let file = state[action.file];

    sdcard().delete((file.path || '') + '/' + file.name);
    let copy = state.slice(0);
    copy.splice(action.file, 1);
    return copy;
  }

  return state;
}
