export async function directory(dir = '/') {
  let storage = navigator.getDeviceStorage('sdcard');
  let root = await storage.getRoot();

  if (dir === '/' || !dir) return root;

  return await root.get(dir);
}

export async function children(dir) {
  let parent = await directory(dir);
  return await parent.getFilesAndDirectories();
}
