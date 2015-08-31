import { LIST_FILES } from 'actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_FILES:
      return action.files;
    default:
      return state;
  }
}
