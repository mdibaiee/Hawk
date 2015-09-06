import Immutable from 'immutable';
import cwd from './cwd';
import lwd from './lwd';
import files from './files';
import navigation from './navigation';
import activeFile from './active-file';
import menu from './menu';
import dialog from './dialog';
import settings from './settings';
import selectView from './select-view';
import spinner from './spinner';
import search from './search';

export default function(state = new Immutable.Map(), action) {
  console.log('action', action);
  return new Immutable.Map({
    lwd: lwd(state, action), // last working directory
    cwd: cwd(state.get('cwd'), action),
    files: files(state.get('files'), action),
    search: search(state.get('search'), action),
    spinner: spinner(state.get('spinner'), action),
    selectView: selectView(state.get('selectView'), action),
    activeFile: activeFile(state.get('activeFile'), action),
    navigation: navigation(state.get('navigation'), action),
    settings: settings(state.get('settings'), action),
    fileMenu: menu(state, action, 'fileMenu'),
    directoryMenu: menu(state, action, 'directoryMenu'),
    moreMenu: menu(state, action, 'moreMenu'),
    renameDialog: dialog(state, action, 'renameDialog'),
    deleteDialog: dialog(state, action, 'deleteDialog'),
    errorDialog: dialog(state, action, 'errorDialog'),
    createDialog: dialog(state, action, 'createDialog'),
    searchDialog: dialog(state, action, 'searchDialog')
  });
}
