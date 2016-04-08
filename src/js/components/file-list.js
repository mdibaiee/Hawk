import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import File from './file';
import Directory from './directory';
import store from 'store';
import { type } from 'utils';
import Hammer from 'react-hammerjs';
import changedir from 'actions/changedir';

@connect(props)
export default class FileList extends Component {
  constructor() {
    super();
  }

  render() {
    let { files, selectView, activeFile, view } = this.props;
    activeFile = activeFile || [];
    let settings = store.getState().get('settings');

    let els = files.map((file, index) => {
      let selected = activeFile.indexOf(file) > -1;
      if (file.type === 'File') {
        return <File selectView={selectView} selected={selected} key={index} index={index} name={file.name} size={file.size} type={file.type} />;
      } else {
        return <Directory selectView={selectView} selected={selected} key={index} index={index} name={file.name} children={file.children} type={file.type} />
      }
    });

    let className= `file-list ${view}`;

    return (
      <Hammer onSwipe={this.swipe} options={{ direction: Hammer.DIRECTION_RIGHT }}>
        <div className={className} ref='container'>
          {els}
        </div>
      </Hammer>
    );
  }

  swipe(e) {
    let current = store.getState().get('cwd');
    let up = current.split('/').slice(0, -1).join('/');

    if (up === current) return;

    store.dispatch(changedir(up));
  }
}

function props(state) {
  return {
    files: state.get('files'),
    selectView: state.get('selectView'),
    activeFile: state.get('activeFile'),
    view: state.get('settings').view || 'list'
  }
}
