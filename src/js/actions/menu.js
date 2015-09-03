import { MENU } from 'actions/types';

export function show(id, props = {}) {
  return {
    type: MENU,
    active: true,
    id, ...props
  }
}

export function hide(id, props = {}) {
  return {
    type: MENU,
    active: false,
    id, ...props
  }
}

export function toggle(id, props = {}) {
  return {
    type: MENU,
    active: 'toggle',
    id, ...props
  }
}

export function hideAll(props = {}) {
  return {
    type: MENU,
    active: false,
    ...props
  }
}
