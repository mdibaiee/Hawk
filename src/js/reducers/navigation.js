import { NAVIGATION, TOGGLE } from 'actions/types';

export default function(state = false, action) {
  if (action.type === NAVIGATION) {
    return action.active === TOGGLE ? !state : action.active;
  }

  return state;
}
