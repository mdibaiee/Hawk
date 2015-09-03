import { type } from 'utils';

let SD_CACHE;
export function sdcard() {
  if (SD_CACHE) return SD_CACHE;

  SD_CACHE = navigator.getDeviceStorage('sdcard');
  return SD_CACHE;
}

let ROOT_CACHE;
export async function root() {
  if (ROOT_CACHE) return ROOT_CACHE;

  ROOT_CACHE = await sdcard().getRoot();
  return ROOT_CACHE;
}

export async function getFile(dir = '/') {
  let parent = await root();

  if (dir === '/' || !dir) return root();

  return await parent.get(dir);
}

export async function children(dir) {
  let parent = await getFile(dir);
  return await parent.getFilesAndDirectories();
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

  return await parent.createDirectory(...args);
}

export async function rename(file, newName) {
  console.log(file);
  let path = (file.path || '').slice(1); // remove starting slash
  let oldPath = (path + file.name);
  let newPath = path + newName;

  let target = await getFile(oldPath);

  if (type(target) === 'Directory') {
    await createDirectory(newPath);
    let childs = await target.getFilesAndDirectories();

    for (let child of childs) {
      await rename(child, newPath + '/' + child.name);
    }

    target.delete();
    return;
  } else {
    let content = await readFile(fullpath);

    let blob = new Blob([content], {type: target.type});

    sdcard().delete(fullpath);

    sdcard().addNamed(blob, path + newName);
  }
}
