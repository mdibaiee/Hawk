import { LIST_FILES, RENAME_FILE, DELETE_FILE, CREATE_FILE, MOVE_FILE, COPY_FILE, SEARCH } from 'actions/types';
import { refresh } from 'actions/files-view';
import { move, remove, sdcard, createFile, createDirectory, copy } from 'api/files';
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
      });
    }

    if (settings.filter) {
      action.files = action.files.filter(file => {
        if (type(file) === 'Directory') return true;

        let fileType = file.type.slice(0, file.type.indexOf('/'));
        return fileType === settings.filter;
      });
    }

    return action.files;
  }

  if (action.type === CREATE_FILE) {
    let fn = action.directory ? createDirectory : createFile;
    fn(action.path).then(boundRefresh, reportError);

    return state;
  }

  if (action.type === RENAME_FILE) {
    let all = Promise.all(action.file.map(file => {
      let cwd = store.getState().get('cwd');
      return move(file, cwd + '/' + action.name);
    }));

    all.then(boundRefresh, reportError);
    return state;
  }

  if (action.type === MOVE_FILE) {
    let all = Promise.all(action.file.map(file => {
      return move(file, action.newPath + '/' + file.name);
    }));

    all.then(boundRefresh, reportError);
    return state;
  }

  if (action.type === COPY_FILE) {
    let all = Promise.all(action.file.map(file => {
      return copy(file, action.newPath + '/' + file.name);
    }));

    all.then(boundRefresh, reportError);
    return state;
  }

  if (action.type === DELETE_FILE) {
    let all = Promise.all(action.file.map(file => {
      let path = ((file.path || '') + file.name).replace(/^\//, '');
      return remove(path, true);
    }))

    all.then(boundRefresh, reportError);
    return state;
  }

  return state;
}

function mov(file, newPath) {
  return
}
