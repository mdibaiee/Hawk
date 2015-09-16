import React, { Component } from 'react';
import store from 'store';
import { humanSize } from 'utils';
import entry from './mixins/entry';

export default class File extends Component {
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
                                             : this.open.bind(this);

    return (
      <div className='file' ref='container'
           onClick={clickHandler}
           onContextMenu={this.contextMenu.bind(this)}>

        {input}
        {label}

        <i></i>
        <p>{this.props.name}</p>
        <span>{humanSize(this.props.size)}</span>
      </div>
    );
  }

  open(e) {
    if (document.querySelector('#file-menu.active')) return;

    let file = store.getState().get('files')[this.props.index];

    let name = file.type === 'application/pdf' ? 'view' : 'open';
    new MozActivity({
      name,
      data: {
        type: file.type,
        blob: file
      }
    })
  }
}
