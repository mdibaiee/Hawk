import Immutable from 'immutable';
import cwd from './cwd';
import files from './files';

export default function(state = new Immutable.Map(), action) {
  return new Immutable.Map({
    cwd: cwd(state.get('cwd'), action),
    files: files(state.get('files'), action)
  });
}
