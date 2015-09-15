import { CHANGE_DIRECTORY } from 'actions/types';

export default function changedir(dir) {
  if (dir === 'sdcard') dir = '';
  return {
    type: CHANGE_DIRECTORY,
    dir
  }
}
