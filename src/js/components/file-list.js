import React, { Component } from 'react';
import { connect } from 'react-redux';
import File from './file';
import Directory from './directory';
import store from 'store';
import { type } from 'utils';

@connect(props)
export default class FileList extends Component {
  constructor() {
    super();
  }

  render() {
    let { files } = this.props;

    let settings = store.getState().get('settings');

    if (settings.showDirectoriesFirst) {
      files = files.sort((a, b) => {
        if (type(a) === 'Directory') return -1;
        if (type(b) === 'Directory') return 1;
        return 0;
      })
    }

    if (!settings.showHiddenFiles) {
      files = files.filter(file => {
        return file.name[0] !== '.';
      })
    }

    let els = files.map((file, index) => {
      if (type(file) === 'File') {
        return <File key={index} index={index} name={file.name} />;
      } else {
        return <Directory key={index} index={index} name={file.name} />
      }
    });

    return (
      <div className='file-list'>
        {els}
      </div>
    );
  }
}

function props(state) {
  return {
    files: state.get('files')
  }
}

async function getFiles(dir) {
  let storage = navigator.getDeviceStorage('sdcard');
  let root = await storage.get(dir);

  return await root.getFilesAndDirectories();
}
