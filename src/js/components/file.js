import React, { Component } from 'react';
import { show } from 'actions/menu';
import { active } from 'actions/file';
import { MENU_WIDTH } from './menu';
import store from 'store';

const MENU_TOP_SPACE = 20;

export default class File extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='file' ref='container'
           onContextMenu={this.contextMenu.bind(this)}>
        <i></i>
        <p>{this.props.name}</p>
      </div>
    );
  }

  contextMenu(e) {
    e.preventDefault();

    let rect = React.findDOMNode(this.refs.container).getBoundingClientRect();
    let {x, y, width, height} = rect;

    let left = x + width / 2 - MENU_WIDTH / 2,
        top  = y + height / 2 + MENU_TOP_SPACE;
    store.dispatch(show('fileMenu', left, top));
    store.dispatch(active(this.props.index));
  }
}
