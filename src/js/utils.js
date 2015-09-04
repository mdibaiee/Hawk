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

const sizes = {
  'GB': Math.pow(2, 30),
  'MB': Math.pow(2, 20),
  'KB': Math.pow(2, 10),
  'B': -1
}
export function humanSize(size) {
  console.log(size);
  for (let key in sizes) {
    let value = sizes[key];

    console.log(value);
    if (size > value) {
      return Math.round(size / value) + key;
    }
  }
}
