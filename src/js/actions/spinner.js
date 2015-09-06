import { SPINNER } from 'actions/types';

export function show() {
  return {
    type: SPINNER,
    active: true
  }
}

export function hide() {
  return {
    type: SPINNER,
    active: false
  }
}

export function toggle() {
  return {
    type: SPINNER,
    active: 'toggle'
  }
}
