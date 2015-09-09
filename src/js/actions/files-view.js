import { LIST_FILES, VIEW, SELECT_VIEW, REFRESH, SEARCH } from 'actions/types';
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
