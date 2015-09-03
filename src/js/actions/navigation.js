import { NAVIGATION, TOGGLE } from 'actions/types';

export function show() {
  return {
    type: NAVIGATION,
    active: true
  }
}

export function hide() {
  return {
    type: NAVIGATION,
    active: false
  }
}

export function toggle() {
  return {
    type: NAVIGATION,
    active: TOGGLE
  }
}
