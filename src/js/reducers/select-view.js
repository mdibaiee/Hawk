import { SELECT_VIEW } from 'actions/types';

export default function(state = false, action) {
  if (action.type === SELECT_VIEW) {
    return action.active === 'toggle' ? !state : action.active;
  }

  return state;
}
