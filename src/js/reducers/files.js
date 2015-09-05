import { LIST_FILES, RENAME_FILE, DELETE_FILE, CREATE_FILE } from 'actions/types';
import { refresh } from 'actions/files-view';
import { move, remove, sdcard, createFile, createDirectory } from 'api/files';
import { show } from 'actions/dialog';
import store, { bind } from 'store';
import { reportError, type } from 'utils';

let boundRefresh = bind(refresh());

export default function(state = [], action) {
  if (action.type === LIST_FILES) {

    let settings = store.getState().get('settings');

    if (settings.showDirectoriesFirst) {
      action.files = action.files.sort((a, b) => {
        if (type(a) === 'Directory') return -1;
        if (type(a) === 'File') return 1;
      });
    }

    if (!settings.showHiddenFiles) {
      action.files = action.files.filter(file => {
        return file.name[0] !== '.';
      })
    }

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
    let copy = state.slice(0);

    if (action.file.length) {
      for (let index of action.file) {
        del(state, index);
      }

      copy = copy.filter((a, i) => action.file.indexOf(i) === -1);
    } else {
      del(state, action.file);
      copy.splice(action.file, 1);
    }

    return copy;
  }

  return state;
}

function del(state, index) {
  let file = state[index];
  return remove((file.path || '') + '/' + file.name).catch(reportError);
}
