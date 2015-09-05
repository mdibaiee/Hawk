import { hideAll } from 'actions/menu';
import { show } from 'actions/dialog';
import store from 'store';

const entryMenu = {
  items: [
    {
      name: 'Rename',
      action() {
        let files = store.getState().get('files');
        let active = store.getState().get('activeFile');
        const name = files[active].name;
        const description = `Are you sure you want to remove ${name}?`;

        store.dispatch(hideAll());
        store.dispatch(show('renameDialog', {description}));
      }
    },
    {
      name: 'Delete',
      action() {
        let files = store.getState().get('files');
        let active = store.getState().get('activeFile');
        const name = files[active].name;
        const description = `Are you sure you want to remove ${name}?`;
        store.dispatch(hideAll());
        store.dispatch(show('deleteDialog', {description}));
      }
    }
  ]
};

const moreMenu = {
  items: [
    {
      name: 'Delete',
      action() {
        let files = store.getState().get('files');
        let active = store.getState().get('activeFile');

        let description;
        if (active.length) {
          const count = active.length;
          description = `Are you sure you want to remove ${count} files?`;
        } else {
          const name = files[active].name;
          description = `Are you sure you want to remove ${name}?`;
        }

        store.dispatch(hideAll());
        store.dispatch(show('deleteDialog', {description}));
      }
    }
  ]
}

export default {
  fileMenu: Object.assign({}, entryMenu),
  directoryMenu: Object.assign({}, entryMenu),
  moreMenu
}
