import { LIST_FILES, FILES_VIEW, REFRESH } from 'actions/types';
import store from 'store';

export function refresh() {
  return {
    type: REFRESH
  }
}

export function toggle(state) {
  return {
    type: FILES_VIEW,
    view: 'toggle'
  }
}

export function details(state) {
  return {
    type: FILES_VIEW,
    view: 'details'
  }
}

export function list(state) {
  return {
    type: FILES_VIEW,
    view: 'list'
  }
}
