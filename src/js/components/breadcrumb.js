import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import changedir from 'actions/changedir';
import { bind } from 'store';
import Hammer from 'react-hammerjs';

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
          <Hammer onTap={bind(changedir(path))} key={index}>
            <span style={style}>{dir}</span>
          </Hammer>
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
            <Hammer onTap={bind(changedir(path))} key={key}>
              <span className='history' style={style}>{dir}</span>
            </Hammer>
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
    let container = this.refs.container;
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
