import React from 'react';
import { hide, hideAll } from 'actions/dialog';
import { rename, deleteFile } from 'actions/file';
import store, { bind } from 'store';

export default {
  renameDialog: {
    title: 'Rename',
    description: 'Enter your desired new name',
    input: true,
    buttons: [
      {
        text: 'Cancel',
        action: bind(hideAll())
      },
      {
        text: 'Rename',
        action() {
          let input = React.findDOMNode(this.refs.input);

          let activeFile = store.getState().get('activeFile');
          this.props.dispatch(rename(activeFile, input.value))
          this.props.dispatch(hideAll());
        },
        className: 'success'
      }
    ]
  },
  deleteDialog: {
    title: 'Delete',
    description: 'Are you sure you want to remove this file?',
    buttons: [
      {
        text: 'No',
        action: bind(hideAll())
      },
      {
        text: 'Yes',
        action() {
          let activeFile = store.getState().get('activeFile');
          this.props.dispatch(deleteFile(activeFile));
          this.props.dispatch(hideAll());
        },
        className: 'success'
      }
    ]
  }
}
