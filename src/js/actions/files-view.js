import { LIST_FILES, FILES_VIEW, SELECT_VIEW, REFRESH, SEARCH } from 'actions/types';
import store from 'store';

export function listFiles(files) {
  return {
    type: LIST_FILES,
    files
  };
}

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

export function search(keywords) {
  return {
    type: SEARCH,
    keywords
  }
}
