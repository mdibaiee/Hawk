import { SEARCH } from 'actions/types';
import store from 'store';
import { reportError } from 'utils';
import { listFiles } from 'actions/files-view';
import { children } from 'api/files';
import { type } from 'utils';

export default function(state = '', action) {
  if (action.type === SEARCH) {
    search(action.keywords);

    return action.keywords;
  }

  return state;
}

function search(keywords) {
  if (!keywords) {
    let cwd = store.getState().get('cwd');
    children(cwd, true).then(files => {
      store.dispatch(listFiles(files));
    }, reportError);
    return '';
  }
  let keys = keywords.split(' ').map(key => key.toLowerCase());

  // We don't want to show all the currently visible files from the
  // first iteration
  let once = true;
  children('/', true).then(function showResults(files) {
    if (!store.getState().get('search')) return;

    let current = once ? [] : store.getState().get('files');
    once = false;

    let filtered = files.filter(file => {
      if (type(file) === 'Directory') {
        let path = (file.path + file.name).replace(/^\//, '');
        children(path, true).then(showResults, reportError);
      }
      return keys.some(key => {
        return file.name.toLowerCase().indexOf(key) > -1;
      });
    });

    if (!filtered.length) return;
    store.dispatch(listFiles(current.concat(filtered)));
  }, reportError);
}
