import { MENU } from 'actions/types';

export function show(id, x, y) {
  return {
    type: MENU,
    active: true,
    id, x, y
  }
}

export function hide(id) {
  return {
    type: MENU,
    active: false,
    id
  }
}

export function toggle(id, x, y) {
  return {
    type: MENU,
    active: 'toggle',
    id, x, y
  }
}

export function hideAll() {
  return {
    type: MENU,
    active: false
  }
}
