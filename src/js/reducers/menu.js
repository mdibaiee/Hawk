import { MENU } from 'actions/types';
import Immutable from 'immutable';
import omit from 'lodash/object/omit';

export default function(state = new Immutable.Map({}), action, id) {
  if (action.type === MENU) {
    let useful = omit(action, ['id', 'type'])
    // action applied to all menus
    if (!action.id) {
      return Object.assign({}, state.get(id), useful);
    }

    if (action.id !== id) return state.get(id);

    let target = state.get(action.id);
    let active = action.active === 'toggle' ? !target.get('active') : action.active;

    return Object.assign({}, target, useful);
  } else {
    return state.get(id);
  }
}
