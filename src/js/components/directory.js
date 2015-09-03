import React, { Component } from 'react';
import changedir from 'actions/changedir';
import { show } from 'actions/menu';
import { active } from 'actions/file';
import { MENU_WIDTH } from './menu';
import store from 'store';

const MENU_TOP_SPACE = 20;

export default class Directory extends Component {
  render() {
    return (
      <div className='directory' ref='container'
           onClick={this.peek.bind(this)}
           onContextMenu={this.contextMenu.bind(this)}>
        <i></i>
        <p>{this.props.name}</p>
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
    store.dispatch(show('directoryMenu', left, top));
    store.dispatch(active(this.props.index));
  }
}
