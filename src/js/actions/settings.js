import { SETTINGS } from 'actions/types';

export default function(props) {
  return {
    type: SETTINGS,
    ...props
  }
}
