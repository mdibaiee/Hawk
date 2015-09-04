import React from 'react';
import { hide, hideAll } from 'actions/dialog';
import { rename, deleteFile, create } from 'actions/file';
import store, { bind } from 'store';

export default {
  createDialog: {
    title: 'Create',
    description: 'Enter a name for the new file',
    input: true,
    buttons: [
      {
        text: 'File',
        action() {
          let input = React.findDOMNode(this.refs.input);

          let cwd = store.getState().get('cwd');
          let action = create(cwd + input.value);
          this.props.dispatch(action);
          this.props.dispatch(hideAll());
        }
      },
      {
        text: 'Directory',
        action() {
          let input = React.findDOMNode(this.refs.input);

          let cwd = store.getState().get('cwd');
          let action = create(cwd + input.value, true);
          this.props.dispatch(action);
          this.props.dispatch(hideAll());
        }
      }
    ]
  },
  renameDialog: {
    title: 'Rename',
    description: 'Enter the new name',
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
  },
  errorDialog: {
    title: 'Error',
    buttons: [{
      text: 'Continue',
      action: bind(hideAll())
    }]
  }
}
