import React from 'react';
import { hide, hideAll } from 'actions/dialog';
import { rename, remove, create, active } from 'actions/file';
import { search } from 'actions/files-view';
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
          let path = cwd + '/' + input.value;
          let action = create(path.replace(/^\//, ''));
          this.props.dispatch(action);
          this.props.dispatch(hideAll());
          this.props.dispatch(active());
          input.value = '';
        }
      },
      {
        text: 'Directory',
        action() {
          let input = React.findDOMNode(this.refs.input);

          let cwd = store.getState().get('cwd');
          let path = cwd + '/' + input.value;
          let action = create(path.replace(/^\//, ''), true);
          this.props.dispatch(action);
          this.props.dispatch(hideAll());
          this.props.dispatch(active());
          input.value = '';
        }
      },
      {
        text: 'Cancel',
        action() {
          let input = React.findDOMNode(this.refs.input);
          this.props.dispatch(hideAll());
          input.value = '';
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
        action() {
          let input = React.findDOMNode(this.refs.input);
          this.props.dispatch(hideAll());
          input.value = '';
        }
      },
      {
        text: 'Rename',
        action() {
          let input = React.findDOMNode(this.refs.input);

          let activeFile = store.getState().get('activeFile');
          this.props.dispatch(rename(activeFile, input.value))
          this.props.dispatch(hideAll());
          this.props.dispatch(active());
          input.value = '';
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
          this.props.dispatch(remove(activeFile));
          this.props.dispatch(hideAll());
          this.props.dispatch(active());
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
  },
  searchDialog: {
    title: 'Search',
    description: 'Enter keywords to search for',
    input: true,
    buttons: [
      {
        text: 'Cancel',
        action() {
          let input = React.findDOMNode(this.refs.input);
          this.props.dispatch(hideAll());
          input.value = '';
        }
      },
      {
        text: 'Search',
        action() {
          let input = React.findDOMNode(this.refs.input);

          let action = search(input.value);
          this.props.dispatch(action);
          this.props.dispatch(hideAll());
          input.value = '';
        },
        className: 'success'
      }
    ]
  }
}
