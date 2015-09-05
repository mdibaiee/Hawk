import { type } from 'utils';

let SD_CACHE;
export function sdcard() {
  if (SD_CACHE) return SD_CACHE;

  SD_CACHE = navigator.getDeviceStorage('sdcard');
  window.sdcard = SD_CACHE;
  return SD_CACHE;
}

let ROOT_CACHE;
export async function root() {
  if (ROOT_CACHE) return ROOT_CACHE;

  ROOT_CACHE = await sdcard().getRoot();
  window.root = ROOT_CACHE;
  return ROOT_CACHE;
}

export async function getFile(dir = '/') {
  let parent = await root();

  if (dir === '/' || !dir) return parent;

  return await parent.get(dir);
}

export async function children(dir, gatherInfo) {
  let parent = await getFile(dir);
  let childs = await parent.getFilesAndDirectories();

  if (gatherInfo) {
    for (let child of childs) {
      if (type(child) !== 'Directory') continue;

      let subchildren;
      try {
        subchildren = await child.getFilesAndDirectories();
      } catch(e) {
        subchildren = [];
      }

      child.children = subchildren.length;
    }
  }

  return childs;
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

export async function createFile(...args) {
  let parent = await root();

  return await parent.createFile(...args);
}

export async function createDirectory(...args) {
  let parent = await root();

  return parent.createDirectory(...args);
}

export async function remove(file) {
  let parent = await root();

  return parent.remove(file);
}

export async function move(file, newPath) {
  let path = (file.path || '').replace(/^\//, ''); // remove starting slash
  let oldPath = path + file.name;

  newPath = newPath.replace(/^\//, '');

  let target = await getFile(oldPath);
  let parent = await root();

  if (type(target) === 'Directory') {
    await parent.createDirectory(newPath);
    let childs = await target.getFilesAndDirectories();

    for (let child of childs) {
      if (type(child) === 'File') {
        child.path = oldPath + '/';
      }

      await move(child, newPath + '/' + child.name);
    }

    await parent.remove(oldPath);
    return;
  } else {
    let content = await readFile(oldPath);

    let blob = new Blob([content], {type: target.type});

    return new Promise((resolve, reject) => {
      let request = sdcard().addNamed(blob, newPath);
      request.onsuccess = resolve;
      request.onerror = reject;
      request.onabort = reject;
    }).then(() => sdcard().delete(oldPath));
  }
}
