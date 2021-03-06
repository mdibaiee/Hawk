import { type, normalize } from 'utils';
import { refresh } from 'actions/files-view';
import { bind } from 'store';

let SD_CACHE;
export let CACHE = {};

localStorage.setItem('cache', '{}');

export function sdcard() {
  if (SD_CACHE) return SD_CACHE;

  SD_CACHE = navigator.getDeviceStorage('sdcard');
  window.sdcard = SD_CACHE;

  return SD_CACHE;
}

let ROOT_CACHE;
export async function root() {
  if (ROOT_CACHE) return ROOT_CACHE;

  ROOT_CACHE = shimDirectory(await sdcard().getRoot());
  Object.defineProperty(ROOT_CACHE, 'name', {
    value: '',
    enumerable: true
  });
  window.root = ROOT_CACHE;
  return ROOT_CACHE;
}

export async function getFile(dir = '/') {
  let parent = await root();

  if (dir === '/' || !dir) return parent;

  let file = await parent.get(normalize(dir));

  Object.defineProperty(file, 'type', {
    value: type(file),
    enumerable: true
  });

  return file;
}

export async function children(dir, gatherInfo) {
  if (CACHE[dir]) return CACHE[dir];

  let parent = shimDirectory(await getFile(dir));
  if (!parent.path) {
    parent.path = dir.slice(0, dir.lastIndexOf('/') + 1);
  }
  if (parent.path.endsWith(parent.name)) {
    Object.defineProperty(parent, 'path', {
      value: normalize(parent.path.slice(0, -parent.name.length)),
      enumerable: true
    });
  }

  let childs = await parent.getFilesAndDirectories();

  for (let child of childs) {
    Object.defineProperty(child, 'type', {
      value: type(child),
      enumerable: true
    });

    if (child.path && child.path.endsWith(child.name)) {
      Object.defineProperty(child, 'path', {
        value: normalize(child.path.slice(0, -child.name.length)),
        enumerable: true
      });
    }
  }

  if (gatherInfo && !window.needsShim) {
    for (let child of childs) {
      if (child.type === 'Directory') {
        let subchildren;
        try {
          subchildren = await shimDirectory(child).getFilesAndDirectories();
        } catch(e) {
          subchildren = [];
        }

        child.children = subchildren.length;
      } else {
        if (typeof child.path === 'undefined') {
          child.path = dir + '/';
        }
      }
    };
  }

  CACHE[dir] = childs;

  return childs;
}

export async function isDirectory(path) {
  let file = await getFile(path);

  return !(file instanceof Blob);
}

export async function readFile(path) {
  let file = await getFile(path);

  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.onabort = reject;
    reader.readAsArrayBuffer(file);
  });
}

export async function writeFile(path, content) {
  try {
    let file = await getFile(path);

    return Promise.reject(new Error('File already exists: ' + path));
  } catch(e) {

  }

  let request = sdcard().addNamed(content, path);

  return new Promise((resolve, reject) => {
    request.onsuccess = resolve;
    request.onerror = reject;
    request.onabort = reject;
  });
}

export async function createFile(path = '') {
  const parentPath = path.split('/').slice(0, -1).join('/');
  let filename = path.slice(path.lastIndexOf('/') + 1);
  let parent = await getFile(parentPath);

  if (!parent.createFile) {
    parent = await root();
    filename = path;
  }

  CACHE[parentPath] = null;
  return await parent.createFile(filename);
}

export async function createDirectory(path) {
  const parentPath = path.split('/').slice(0, -1).join('/');
  let filename = path.slice(path.lastIndexOf('/') + 1);
  let parent = await getFile(parentPath);

  if (!parent.createDirectory) {
    parent = await root();
    filename = path;
  }

  CACHE[parentPath] = null;

  return parent.createDirectory(filename).then(() => {
    if (window.needsShim) {
      return createFile(path + '/.empty');
    }
  });
}

export async function remove(file, deep = true) {
  // const method = deep ? 'removeDeep' : 'remove';
  const method = 'removeDeep';
  let path = normalize(file);
  const parentPath = path.split('/').slice(0, -1).join('/');
  let filename = path.slice(path.lastIndexOf('/') + 1);
  let parent = await getFile(parentPath);

  if (!parent[method]) {
    parent = await root();
    filename = path;
  }

  CACHE[parentPath] = null;

  return parent[method](filename);
}

export async function move(file, newPath) {
  let path = normalize(file.path || '');
  let oldPath = path + file.name;

  let process = await copy(file, newPath);
  return remove(oldPath, true);
}

export async function copy(file, newPath) {
  let path = normalize(file.path || '').replace(/^\//, '');
  let oldPath = normalize(path + file.name);

  newPath = normalize(newPath);

  let target = await getFile(oldPath);
  let parent = await root();

  if (type(target) === 'Directory') {
    await parent.createDirectory(newPath);
    let childs = await shimDirectory(target).getFilesAndDirectories();

    for (let child of childs) {
      if (type(child) === 'File') {
        Object.defineProperty(child, 'path', {
          value: oldPath + '/',
          enumerable: true,
          configurable: true
        });
      }

      await copy(child, newPath + '/' + child.name);
    }

    return;
  } else {
    let content = await readFile(oldPath);

    let blob = new Blob([content], {type: target.type});

    return writeFile(newPath, blob);
  }
}
