import React, { Component } from 'react';
import changedir from 'actions/changedir';
import { show } from 'actions/menu';
import { active } from 'actions/file';
import { MENU_WIDTH } from './menu';
import store from 'store';
import entry from './mixins/entry';

const MENU_TOP_SPACE = 20;

export default class Directory extends Component {
  constructor() {
    super();
    Object.assign(this, entry);
  }

  render() {
    let checkId = `file-${this.props.index}`;

    let input, label;
    if (this.props.selectView) {
      input = <input type='checkbox' id={checkId} checked={this.props.selected} readOnly />;
      label = <label htmlFor={checkId}></label>;
    }

    let clickHandler = this.props.selectView ? this.select.bind(this)
                                             : this.peek.bind(this);

    return (
      <div className='directory' ref='container'
           onClick={clickHandler}
           onContextMenu={this.contextMenu.bind(this)}>

        {input}
        {label}

        <i></i>
        <p>{this.props.name}</p>
        <span>{this.props.children} items</span>
      </div>
    );
  }

  peek() {
    let file = store.getState().get('files')[this.props.index];

    store.dispatch(changedir(file.path.slice(1) + file.name));
  }
}
