import { CREATE_FILE, SHARE_FILE, RENAME_FILE, ACTIVE_FILE, DELETE_FILE, MOVE_FILE, COPY_FILE } from 'actions/types';

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

export function move(file, newPath) {
  return {
    type: MOVE_FILE,
    file, newPath
  }
}

export function copy(file, newPath) {
  return {
    type: COPY_FILE,
    file, newPath
  }
}

export function active(file = null) {
  return {
    type: ACTIVE_FILE,
    file
  }
}

export function remove(file) {
  return {
    type: DELETE_FILE,
    file
  }
}
