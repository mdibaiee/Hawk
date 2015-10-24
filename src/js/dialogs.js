import React from 'react';
import { hide, hideAll, show } from 'actions/dialog';
import { rename, remove, create, active } from 'actions/file';
import { search } from 'actions/files-view';
import { compress } from 'actions/compress';
import store, { bind } from 'store';

const INVALID_NAME = 'Please enter a valid name.';
const INVALID_SEARCH = 'You can\'t leave the input empty';

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

          if (!input.value) {
            this.props.dispatch(hideAll());
            this.props.dispatch(active());
            this.props.dispatch(show('errorDialog', {description: INVALID_NAME}));
            return;
          }

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

          if (!input.value) {
            this.props.dispatch(hideAll());
            this.props.dispatch(active());
            this.props.dispatch(show('errorDialog', {description: INVALID_NAME}));
            return;
          }

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

          if (!input.value) {
            this.props.dispatch(hideAll());
            this.props.dispatch(active());
            this.props.dispatch(show('errorDialog', {description: INVALID_NAME}));
            return;
          }

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

          if (!input.value) {
            this.props.dispatch(hideAll());
            this.props.dispatch(active());
            this.props.dispatch(show('errorDialog',
                                {description: INVALID_SEARCH}));
            return;
          }

          let action = search(input.value);
          this.props.dispatch(action);
          this.props.dispatch(hideAll());
          input.value = '';
        },
        className: 'success'
      }
    ]
  },
  compressDialog: {
    title: 'Archive',
    description: 'Enter your desired archive name',
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
        text: 'Create',
        action() {
          let input = React.findDOMNode(this.refs.input);

          if (!input.value) {
            this.props.dispatch(hideAll());
            this.props.dispatch(active());
            this.props.dispatch(show('errorDialog',
                                {description: INVALID_NAME}));
            return;
          }

          let activeFile = store.getState().get('activeFile');
          this.props.dispatch(compress(activeFile, input.value))
          this.props.dispatch(hideAll());
          this.props.dispatch(active());
          input.value = '';
        },
        className: 'success'
      }
    ]
  }
}
