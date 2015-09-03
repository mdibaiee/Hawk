import { CHANGE_DIRECTORY } from 'actions/types';

export default function(state = '', action) {
  if (action.type === CHANGE_DIRECTORY) {
    return state.get('cwd');
  }
  return state.get('lwd');
}
