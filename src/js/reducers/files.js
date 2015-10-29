import { LIST_FILES, RENAME_FILE, DELETE_FILE, CREATE_FILE, MOVE_FILE, COPY_FILE, SEARCH, COMPRESS, DECOMPRESS } from 'actions/types';
import zip from 'jszip';
import { refresh } from 'actions/files-view';
import * as auto from 'api/auto';
import { show } from 'actions/dialog';
import store, { bind } from 'store';
import { reportError, type, normalize } from 'utils';

let boundRefresh = bind(refresh());

export default function(state = [], action) {

  if (action.type === LIST_FILES) {
    let settings = store.getState().get('settings');

    if (settings.showDirectoriesFirst) {
      action.files = action.files.sort((a, b) => {
        if (type(a) === 'Directory') return -1;
        if (type(a) === 'File') return 1;
      });
    }

    if (!settings.showHiddenFiles) {
      action.files = action.files.filter(file => {
        return file.name[0] !== '.';
      });
    }

    if (settings.filter) {
      action.files = action.files.filter(file => {
        if (type(file) === 'Directory') return true;

        let fileType = file.type.slice(0, file.type.indexOf('/'));
        return fileType === settings.filter;
      });
    }

    return action.files;
  }

  if (action.type === CREATE_FILE) {
    let fn = action.directory ? auto.createDirectory : auto.createFile;
    fn(action.path).then(boundRefresh, reportError);

    return state;
  }

  if (action.type === RENAME_FILE) {
    let all = Promise.all(action.file.map(file => {
      let cwd = store.getState().get('cwd');
      return auto.move(file, cwd + '/' + action.name);
    }));

    all.then(boundRefresh, reportError);
    return state;
  }

  if (action.type === MOVE_FILE) {
    let all = Promise.all(action.file.map(file => {
      return auto.move(file, action.newPath + '/' + file.name);
    }));

    all.then(boundRefresh, reportError);
    return state;
  }

  if (action.type === COPY_FILE) {
    let all = Promise.all(action.file.map(file => {
      return auto.copy(file, action.newPath + '/' + file.name);
    }));

    all.then(boundRefresh, reportError);
    return state;
  }

  if (action.type === DELETE_FILE) {
    let all = Promise.all(action.file.map(file => {
      let path = normalize((file.path || '') + file.name);
      return auto.remove(path, true);
    }))

    all.then(boundRefresh, reportError);
    return state;
  }

  if (action.type === COMPRESS) {
    let archive = new zip();
    let cwd = store.getState().get('cwd');

    let all = Promise.all(action.file.map(function addFile(file) {
      let path = normalize((file.path || '') + file.name);
      let archivePath = path.slice(cwd.length);
      console.log(archivePath);
      // directory
      if (!(file instanceof Blob)) {
        let folder = archive.folder(file.name);

        return auto.children(path).then(files => {
          return Promise.all(files.map(child => {
            return addFile(child);
          }));
        });
      }

      return auto.readFile(path).then(content => {
        archive.file(archivePath, content);
      });
    }))

    all.then(() => {
      let buffer = archive.generate({ type: 'nodebuffer' });
      let blob = new Blob([buffer], { type: 'application/zip' });

      let cwd = store.getState().get('cwd');
      let path = normalize(cwd + '/' + action.name);
      console.log(path);
      return auto.writeFile(path, blob);
    }).then(boundRefresh).catch(reportError);

    return state;
  }

  if (action.type === DECOMPRESS) {
    let file = action.file[0];
    let path = normalize((file.path || '') + file.name);
    auto.readFile(path).then(content => {
      let archive = new zip(content);
      let files = Object.keys(archive.files);

      let all = Promise.all(files.map(name => {
        let buffer = archive.files[name].asArrayBuffer();
        let blob = new Blob([buffer]);

        let cwd = store.getState().get('cwd');
        let filePath = normalize(cwd + '/' + name);

        return auto.writeFile(filePath, blob);
      }));

      all.then(boundRefresh, reportError);
    });
  }

  return state;
}
