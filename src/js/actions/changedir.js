import { CHANGE_DIRECTORY } from 'actions/types';

export default function changedir(dir) {
  return {
    type: CHANGE_DIRECTORY,
    dir
  };
}
