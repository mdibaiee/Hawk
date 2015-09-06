import { SPINNER, CHANGE_DIRECTORY, LIST_FILES, REFRESH, DIALOG, CREATE_FILE, DELETE_FILE } from 'actions/types';

export default function(state = false, action) {
  if (action.type === SPINNER) {
    return action.active === 'toggle' ? !state : action.active;
  }

  if (action.type === DIALOG && action.id === 'errorDialog') {
    return false;
  }

  switch (action.type) {
    case CHANGE_DIRECTORY:
    case REFRESH:
      return true;
    case LIST_FILES:
      return false;
  }

  return state;
}
