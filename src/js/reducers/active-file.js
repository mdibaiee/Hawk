import { ACTIVE_FILE, SELECT_VIEW } from 'actions/types';

export default function(state = null, action) {
  if (action.type === ACTIVE_FILE) {
    return action.file;
  }

  return state;
}
