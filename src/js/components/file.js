import React, { Component } from 'react';
import { show } from 'actions/menu';
import { active } from 'actions/file';
import { MENU_WIDTH } from './menu';
import store from 'store';
import { humanSize } from 'utils';
import entry from './mixins/entry';

const MENU_TOP_SPACE = 20;

export default class File extends Component {
  constructor() {
    super();
    Object.assign(this, entry);
  }

  render() {
    let checkId = `file-${this.props.index}`;

    let input, label;
    if (this.props.selectView) {
      input = <input type='checkbox' id={checkId} defaultChecked={this.props.selected} readOnly />;
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
