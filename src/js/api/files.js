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

  return await parent.get(normalize(dir));
}

export async function children(dir, gatherInfo) {
  if (CACHE[dir]) return CACHE[dir];

  let parent = shimDirectory(await getFile(dir));
  if (!parent.path) {
    parent.path = dir.slice(0, dir.lastIndexOf('/') + 1);
  }
  let childs = await parent.getFilesAndDirectories();

  if (gatherInfo && !window.needsShim) {
    for (let child of childs) {
      if (type(child) === 'Directory') {
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
  let request = sdcard().addNamed(content, path);

  return new Promise((resolve, reject) => {
    request.onsuccess = resolve;
    request.onerror = reject;
    request.onabort = reject;
  });
}

export async function createFile(...args) {
  let parent = await root();

  return await parent.createFile(...args);
}

export async function createDirectory(...args) {
  let parent = await root();

  return parent.createDirectory(...args).then(() => {
    if (window.needsShim) {
      return createFile(args[0] + '/.empty');
    }
  });
}

export async function remove(file, deep) {
  let path = normalize(file);
  let parent = await root();

  return parent[deep ? 'removeDeep' : 'remove'](path);
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
