import { LIST_FILES } from 'actions/types';

export default function listFiles(files) {
  return {
    type: LIST_FILES,
    files
  };
}
