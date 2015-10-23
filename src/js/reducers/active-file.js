import { ACTIVE_FILE, CHANGE_DIRECTORY } from 'actions/types';

export default function(state = null, action) {
  if (action.type === ACTIVE_FILE) {
    return action.file;
  }

  if (action.type === CHANGE_DIRECTORY) {
    return null;
  }

  return state;
}
