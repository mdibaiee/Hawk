import store from 'store';
import { show } from 'actions/dialog';

export function type(obj) {
  return obj.toString().slice(8, -1);
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
  console.error(err);
  let action = show('errorDialog', {description: err.message});
  store.dispatch(action);
}

export function normalize(path) {
  return path.replace(/^\//, '').replace('sdcard/', '');
}

const sizes = {
  'GB': Math.pow(2, 30),
  'MB': Math.pow(2, 20),
  'KB': Math.pow(2, 10),
  'B': 0
}
export function humanSize(size) {
  for (let key in sizes) {
    let value = sizes[key];

    if (size >= value) {
      return Math.round(size / value) + key;
    }
  }
}
