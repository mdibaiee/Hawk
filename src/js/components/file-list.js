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
    let { files, selectView, activeFile } = this.props;
    activeFile = activeFile || [];
    let settings = store.getState().get('settings');

    let els = files.map((file, index) => {
      let selected = activeFile.indexOf(index) > -1;
      if (type(file) === 'File') {
        return <File selectView={selectView} selected={selected} key={index} index={index} name={file.name} size={file.size} />;
      } else {
        return <Directory selectView={selectView} selected={selected} key={index} index={index} name={file.name} children={file.children} />
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
    files: state.get('files'),
    selectView: state.get('selectView'),
    activeFile: state.get('activeFile')
  }
}

async function getFiles(dir) {
  let storage = navigator.getDeviceStorage('sdcard');
  let root = await storage.get(dir);

  return await root.getFilesAndDirectories();
}
