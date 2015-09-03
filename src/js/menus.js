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
        let files = store.getState().get('files');
        let active = store.getState().get('activeFile');
        const name = files[active].name;
        const MSG = `Are you sure you want to remove ${name}?`;
        store.dispatch(hideAll());
        store.dispatch(show('deleteDialog', {description: MSG}));
      }
    }
  ]
};

export default {
  fileMenu: Object.assign({}, entryMenu),
  directoryMenu: Object.assign({}, entryMenu)
}
