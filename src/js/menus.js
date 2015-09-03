import { hideAll } from 'actions/menu';
import { show } from 'actions/dialog';
import store from 'store';

const entryMenu = {
  items: [
    {
      name: 'Rename',
      action() {
        store.dispatch(hideAll());
        store.dispatch(show('renameDialog'));
      }
    },
    {
      name: 'Delete',
      action() {
        store.dispatch(hideAll());
        store.dispatch(show('deleteDialog'))
      }
    }
  ]
};

export default {
  fileMenu: Object.assign({}, entryMenu),
  directoryMenu: Object.assign({}, entryMenu)
}
