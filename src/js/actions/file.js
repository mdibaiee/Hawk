import { CREATE_FILE, SHARE_FILE, RENAME_FILE, ACTIVE_FILE, DELETE_FILE } from 'actions/types';

export function create(path, directory = false) {
  return {
    type: CREATE_FILE,
    path, directory
  }
}

export function share(path) {
  return {
    type: SHARE_FILE,
    path
  }
}

export function rename(file, name) {
  return {
    type: RENAME_FILE,
    file, name
  }
}

export function active(file) {
  return {
    type: ACTIVE_FILE,
    file
  }
}

export function deleteFile(file) {
  return {
    type: DELETE_FILE,
    file
  }
}
