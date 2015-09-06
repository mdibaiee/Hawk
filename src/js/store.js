import { createStore } from 'redux';
import reducers from 'reducers/all';
import changedir from 'actions/changedir';
import Immutable from 'immutable';
import menus from './menus';
import dialogs from './dialogs';

const DEFAULT = new Immutable.Map(Object.assign({
  dir: '',
}, dialogs, menus));

let store = createStore(reducers, DEFAULT);

export function bind(action) {
  return () => store.dispatch(action);
}

export default store;

store.dispatch(changedir(DEFAULT.get('dir')));
