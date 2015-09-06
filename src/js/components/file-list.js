import React, { Component } from 'react';
import { connect } from 'react-redux';
import File from './file';
import Directory from './directory';
import store from 'store';
import { type } from 'utils';
import Hammer from 'hammerjs';
import changedir from 'actions/changedir';

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
      let selected = activeFile.indexOf(file) > -1;
      if (type(file) === 'File') {
        return <File selectView={selectView} selected={selected} key={index} index={index} name={file.name} size={file.size} />;
      } else {
        return <Directory selectView={selectView} selected={selected} key={index} index={index} name={file.name} children={file.children} />
      }
    });

    return (
      <div className='file-list' ref='container'>
        {els}
      </div>
    );
  }

  componentDidMount() {
    let container = React.findDOMNode(this.refs.container);
    let touch = Hammer(container);

    touch.on('swipe', e => {
      let current = store.getState().get('cwd');
      let up = current.split('/').slice(0, -1).join('/');

      if (up === current) return;

      store.dispatch(changedir(up));
    }).set({direction: Hammer.DIRECTION_RIGHT});
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
