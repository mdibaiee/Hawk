import { DIALOG } from 'actions/types';

export function show(id) {
  return {
    type: DIALOG,
    active: true,
    id
  }
}

export function hide(id) {
  return {
    type: DIALOG,
    active: false,
    id
  }
}

export function toggle(id) {
  return {
    type: DIALOG,
    active: 'toggle',
    id
  }
}

export function hideAll() {
  return {
    type: DIALOG,
    active: false
  }
}
