import { SETTINGS } from 'actions/types';
import omit from 'lodash/object/omit';

const DEFAULT = {
  showHiddenFiles: false,
  showDirectoriesFirst: true
}

export default function(state = DEFAULT, action) {
  if (action.type === SETTINGS) {
    let newSettings = Object.assign({}, state, omit(action, 'type'));

    localStorage.setItem('settings', JSON.stringify(newSettings));

    return newSettings;
  }

  return state;
}
