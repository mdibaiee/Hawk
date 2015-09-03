import { LIST_FILES, RENAME_FILE, DELETE_FILE } from 'actions/types';
import { refresh } from 'actions/files-view';
import { move, sdcard } from 'api/files';
import { show } from 'actions/dialog';
import store from 'store';

export default function(state = [], action) {
  if (action.type === LIST_FILES) {
    return action.files;
  }


  if (action.type === RENAME_FILE) {
    let file = state[action.file];

    move(file, (file.path || '') + action.name).then(refresh, err => {
      let action = show('errorDialog', {description: err.message});
      store.dispatch(action);
    });

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
