import React, { Component } from 'react';
import changedir from 'actions/changedir';
import { show } from 'actions/menu';
import { active } from 'actions/file';
import { MENU_WIDTH } from './menu';
import store from 'store';

const MENU_TOP_SPACE = 20;

export default class Directory extends Component {
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

  contextMenu(e) {
    e.preventDefault();

    let rect = React.findDOMNode(this.refs.container).getBoundingClientRect();
    let {x, y, width, height} = rect;

    let left = x + width / 2 - MENU_WIDTH / 2,
        top  = y + height / 2 + MENU_TOP_SPACE;
    store.dispatch(show('directoryMenu', {style: {left, top}}));
    store.dispatch(active(this.props.index));
  }

  select() {
    let current = (store.getState().get('activeFile') || []).slice(0);
    let index = this.props.index;

    if (current.indexOf(index) > -1) {
      current.splice(current.indexOf(index), 1);
    } else {
      current.push(index)
    }
    store.dispatch(active(current));
  }
}
