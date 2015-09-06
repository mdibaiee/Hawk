import { SPINNER, CHANGE_DIRECTORY, LIST_FILES, REFRESH, DIALOG, SETTINGS,
         CREATE_FILE, DELETE_FILE, RENAME_FILE, MOVE_FILE, COPY_FILE, SEARCH} from 'actions/types';

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
    case SETTINGS:
    case CREATE_FILE:
    case MOVE_FILE:
    case DELETE_FILE:
    case RENAME_FILE:
    case COPY_FILE:
    case SEARCH:
      return true;
    case LIST_FILES:
      return false;
  }

  return state;
}
