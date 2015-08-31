import React, { Component } from 'react';
import { connect } from 'react-redux';
import File from './file';

@connect(props)
export default class FileList extends Component {
  constructor() {
    super();
  }

  render() {
    let { cwd, files } = this.props;

    let els = files.map((file, index) => {
      return <File key={index} index={index} name={file.name} />;
    });

    return (
      <div><strong>cwd: {cwd}</strong>
        {els}
      </div>
    );
  }
}

function props(state) {
  return {
    cwd: state.get('cwd'),
    files: state.get('files')
  }
}

async function getFiles(dir) {
  let storage = navigator.getDeviceStorage('sdcard');
  let root = await storage.get(dir);

  return await root.getFilesAndDirectories();
}
