import store from 'store';
import { show } from 'actions/dialog';

export function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export function template(string, props) {
  return string.replace(/@(\S+)/g, (all, match) => {
    return getKey(props, match);
  });
}

export function getKey(object = store.getState().toJS(), key) {
  let parent = object;

  do {
    let dot = key.indexOf('.');
    if (dot === -1) dot = key.length;
    parent = parent[key.slice(0, dot)];

    key = key.slice(dot + 1);
  } while (key)

  return parent;
}

export function reportError(err) {
  let action = show('errorDialog', {description: err.message});
  store.dispatch(action);
}
