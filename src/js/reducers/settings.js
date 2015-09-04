import { SETTINGS } from 'actions/types';
import omit from 'lodash/object/omit';

const DEFAULT = {
  showHiddenFiles: false,
  showDirectoriesFirst: true
}

export default function(state = DEFAULT, action) {
  if (action.type === SETTINGS) {
    return Object.assign({}, state, omit(action, 'type'));
  }

  return state;
}
