import { hideAll } from 'actions/menu';
import { show } from 'actions/dialog';
import { selectView } from 'actions/files-view';
import { copy, move } from 'actions/file';
import { compress, decompress } from 'actions/compress';
import store from 'store';

const entryMenu = {
  items: [
    {
      name: 'Rename',
      action() {
        let files = store.getState().get('files');
        let active = store.getState().get('activeFile');
        let name = active[0].name;
        const description = `Enter the new name for ${name}`;

        store.dispatch(hideAll());
        store.dispatch(show('renameDialog', {description, value: name}));
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
    },
    {
      name: 'Share',
      action() {
        let active = store.getState().get('activeFile');

        new MozActivity({
          name: 'share',
          data: {
            number: 1,
            blobs: active
          }
        })
      }
    },
    {
      name: 'Pick',
      enabled() {
        return store.getState().get('pick');
      },
      action() {
        let request = store.getState().get('pick');

        let active = store.getState().get('activeFile');
        let blob = active[0];
        request.postResult({
          type: blob.type,
          blob
        });
      }
    },
    {
      name: 'Extract',
      enabled() {
        let active = store.getState().get('activeFile');

        if (active) console.log(active[0].name);
        return active && active[0].name.indexOf('.zip') > -1;
      },
      action() {
        let active = store.getState().get('activeFile');

        store.dispatch(decompress(active));
      }
    },
    {
      name: 'Archive',
      action() {
        let active = store.getState().get('activeFile');

        store.dispatch(compress(active));
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
        return store.getState().get('selectView');
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
    },
    {
      name: 'Share',
      action() {
        let active = store.getState().get('activeFile');

        new MozActivity({
          name: 'share',
          data: {
            number: active.length,
            blobs: active
          }
        })
      }
    },
    {
      name: 'Archive',
      action() {
        let active = store.getState().get('activeFile');

        store.dispatch(compress(active));
      }
    }
  ]
}

export default {
  fileMenu: Object.assign({}, entryMenu),
  directoryMenu: Object.assign({}, entryMenu),
  moreMenu
}
