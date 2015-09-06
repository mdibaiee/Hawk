import { hideAll } from 'actions/menu';
import { show } from 'actions/dialog';
import { selectView } from 'actions/files-view';
import { copy, move } from 'actions/file';
import store from 'store';

const entryMenu = {
  items: [
    {
      name: 'Rename',
      action() {
        let files = store.getState().get('files');
        let active = store.getState().get('activeFile');
        const description = `Enter the new name for ${active[0].name}?`;

        store.dispatch(hideAll());
        store.dispatch(show('renameDialog', {description}));
      }
    },
    {
      name: 'Delete',
      action() {
        let files = store.getState().get('files');
        let active = store.getState().get('activeFile');
        const description = `Are you sure you want to remove ${active[0].name}?`;
        store.dispatch(hideAll());
        store.dispatch(show('deleteDialog', {description}));
      }
    },
    {
      name: 'Copy',
      action() {
        store.dispatch(selectView(false));
        store.dispatch(hideAll());
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
        if (active.length > 1) {
          const count = active.length;
          description = `Are you sure you want to remove ${count} files?`;
        } else {
          const name = active[0].name;
          description = `Are you sure you want to remove ${name}?`;
        }

        store.dispatch(hideAll());
        store.dispatch(show('deleteDialog', {description}));
      },
      enabled() {
        return store.getState().get('activeFile');
      }
    },
    {
      name: 'Copy',
      action() {
        store.dispatch(selectView(false));
        store.dispatch(hideAll());
      },
      enabled() {
        return store.getState().get('activeFile');
      }
    },
    {
      name: 'Paste',
      enabled() {
        return store.getState().get('activeFile');
      },
      action() {
        let active = store.getState().get('activeFile');
        let cwd = store.getState().get('cwd');

        store.dispatch(copy(active, cwd));
        store.dispatch(hideAll());
      }
    },
    {
      name: 'Move',
      enabled() {
        return store.getState().get('activeFile');
      },
      action() {
        let active = store.getState().get('activeFile');
        let cwd = store.getState().get('cwd');

        store.dispatch(move(active, cwd));
        store.dispatch(hideAll());
      }
    }
  ]
}

export default {
  fileMenu: Object.assign({}, entryMenu),
  directoryMenu: Object.assign({}, entryMenu),
  moreMenu
}
