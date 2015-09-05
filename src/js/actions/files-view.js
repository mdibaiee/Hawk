import { LIST_FILES, FILES_VIEW, SELECT_VIEW, REFRESH } from 'actions/types';
import store from 'store';

export function refresh() {
  return {
    type: REFRESH
  }
}

export function toggle() {
  return {
    type: FILES_VIEW,
    view: 'toggle'
  }
}

export function details() {
  return {
    type: FILES_VIEW,
    view: 'details'
  }
}

export function list() {
  return {
    type: FILES_VIEW,
    view: 'list'
  }
}

export function selectView(active = true) {
  return {
    type: SELECT_VIEW,
    active
  }
}
