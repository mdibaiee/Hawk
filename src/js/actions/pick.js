import { PICK } from 'actions/types';

export function enable(request) {
  return {
    type: PICK,
    active: request
  }
}

export function disable() {
  return {
    type: PICK,
    active: false
  }
}
