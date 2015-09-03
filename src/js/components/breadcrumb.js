import React, { Component } from 'react';
import { connect } from 'react-redux';
import changedir from 'actions/changedir';
import { bind } from 'store';

// TODO: Fix history not working when clicking on sdcard
@connect(props)
export default class Breadcrumb extends Component {
  render() {
    let directories = this.props.cwd.split('/');
    directories.unshift('sdcard');

    let els = directories.map((dir, index, arr) => {
      let path = arr.slice(1, index + 1).join('/');
      let slash = index > 0 ? '/' : '';

      return (
        <span key={index} onClick={bind(changedir(path))}>
          <i>{slash}</i>{dir}
        </span>
      );
    });

    let lastDirectories = this.props.lwd.split('/');
    if (lastDirectories.length > directories.length - 1) {
      lastDirectories.splice(0, directories.length - 1);
      let history = lastDirectories.map((dir, index, arr) => {
        let current = directories.slice(1).concat(arr.slice(0, index + 1));
        let path = current.join('/');

        return (
          <span key={directories.length + index} className='history' onClick={bind(changedir(path))}>
            <i>/</i>{dir}
          </span>
        )
      });

      els = els.concat(history);
    }

    return (
      <div className='breadcrumb'>
        {els}
      </div>
    );
  }
}

function props(state) {
  return {
    lwd: state.get('lwd'), // last working directory
    cwd: state.get('cwd')
  }
}
