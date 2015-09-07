import { PICK } from 'actions/types';

export default function(state = false, action) {
  if (action.type === PICK) {
    return action.active;
  }

  return state;
}
