import { DIALOG } from 'actions/types';

export function show(id, props = {}) {
  return {
    type: DIALOG,
    active: true,
    id, ...props
  }
}

export function hide(id, props = {}) {
  return {
    type: DIALOG,
    active: false,
    id, ...props
  }
}

export function toggle(id, props = {}) {
  return {
    type: DIALOG,
    active: 'toggle',
    id, ...props
  }
}

export function hideAll(props = {}) {
  return {
    type: DIALOG,
    active: false,
    ...props
  }
}
