import React, { Component } from 'react';
import { connect } from 'react-redux';
import changedir from 'actions/changedir';
import { bind } from 'store';

@connect(props)
export default class Breadcrumb extends Component {
  render() {
    let els = [];

    if (this.props.search) {
      els = [
        <span key='000'>Search: {this.props.search}</span>
      ]
    } else {
      let directories = this.props.cwd.split('/').filter(a => a);
      let lastDirectories = this.props.lwd.split('/').filter(a => a);
      directories.unshift('sdcard');

      let sumLength = directories.length + lastDirectories.length;

      els = els.concat(directories.map((dir, index, arr) => {
        let path = arr.slice(1, index + 1).join('/');
        let style = { zIndex: sumLength - index };

        return (
          <span key={index} onClick={bind(changedir(path))} style={style}>{dir}</span>
        );
      }));

      if (lastDirectories.length > directories.length - 1) {
        lastDirectories.splice(0, directories.length - 1);

        let history = lastDirectories.map((dir, index, arr) => {
          let current = directories.slice(1).concat(arr.slice(0, index + 1));
          let path = current.join('/').replace(/^\//, ''); // remove starting slash
          let key = directories.length + index;
          let style = { zIndex: arr.length - index};

          return (
            <span key={key} className='history' onClick={bind(changedir(path))} style={style}>{dir}</span>
          )
        });

        els = els.concat(history);
      }
    }

    return (
      <div className='breadcrumb' ref='container'>
        <div>
          {els}
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    let container = React.findDOMNode(this.refs.container);
    let currents = container.querySelectorAll('span:not(.history)');

    container.scrollLeft = currents[currents.length - 1].offsetLeft;
  }
}

function props(state) {
  return {
    lwd: state.get('lwd'), // last working directory
    cwd: state.get('cwd'),
    search: state.get('search')
  }
}
