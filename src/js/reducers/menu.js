import { MENU } from 'actions/types';
import Immutable from 'immutable';

export default function(state = new Immutable.Map({}), action, id) {
  if (action.type === MENU) {
    // action applied to all menus
    if (!action.id) {
      return Object.assign({}, state.get(id), {active: action.active});
    }

    if (action.id !== id) return state.get(id);

    let target = state.get(action.id);
    let active = action.active === 'toggle' ? !target.get('active') : action.active;

    let style = Object.assign({}, state.style, {left: action.x, top: action.y});

    return Object.assign({}, target, { style, active });
  } else {
    return state.get(id);
  }
}
