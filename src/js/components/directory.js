import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import changedir from 'actions/changedir';
import store from 'store';
import entry from './mixins/entry';
import Hammer from 'react-hammerjs';

export default class Directory extends Component {
  constructor() {
    super();
    Object.assign(this, entry);
  }

  render() {
    let checkId = `file-${this.props.index}`;

    let input, label;
    if (this.props.selectView) {
      input = <input type='checkbox' id={checkId} checked={this.props.selected} readOnly ref='check' />;
      label = <label htmlFor={checkId}></label>;
    }

    let clickHandler = this.props.selectView ? this.select.bind(this)
                                             : this.peek.bind(this);

    return (
      <Hammer onTap={clickHandler}>
        <div className='directory' ref='container'
             onContextMenu={this.contextMenu.bind(this)}>

          {input}
          {label}

          <i></i>
          <p>{this.props.name}</p>
          <span>{this.props.children ? this.props.children + ' items' : ''}</span>
        </div>
      </Hammer>
    );
  }

  peek() {
    if (document.querySelector('#file-menu.active')) return;

    let file = store.getState().get('files')[this.props.index];

    const path = file.path.endsWith(file.name) ? file.path : file.path + file.name;
    store.dispatch(changedir(path));
  }
}
