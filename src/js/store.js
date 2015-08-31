import { createStore } from 'redux';
import reducers from 'reducers/all';
import changedir from 'actions/changedir';
import Immutable from 'immutable';

const DEFAULT = new Immutable.Map({
  dir: '/',
  files: []
});

let store = createStore(reducers, DEFAULT);
store.dispatch(changedir(DEFAULT.dir));

export default store;
