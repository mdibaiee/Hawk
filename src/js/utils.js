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
  let msg = err.message || err.target.error.message;
  let action = show('errorDialog', {description: msg});
  store.dispatch(action);
}

export function normalize(path) {
  return path.replace(/^\//, '').replace('sdcard/', '');
}

const sizes = {
  'GB': Math.pow(2, 30),
  'MB': Math.pow(2, 20),
  'KB': Math.pow(2, 10),
  'B': -1
}
export function humanSize(size) {
  for (let key in sizes) {
    let value = sizes[key];

    if (size >= value) {
      return Math.abs(Math.round(size / value)) + key;
    }
  }
}

export function getLength(string) {
  var byteLen = 0;
  for (var i = 0; i < string.length; i++) {
    var c = string.charCodeAt(i);
    byteLen += c < (1 <<  7) ? 1 :
               c < (1 << 11) ? 2 :
               c < (1 << 16) ? 3 :
               c < (1 << 21) ? 4 :
               c < (1 << 26) ? 5 :
               c < (1 << 31) ? 6 : Number.NaN;
  }
  return byteLen;
}
