import React from 'react';
import { active } from 'actions/file';
import { show } from 'actions/menu';
import { MENU_WIDTH } from 'components/menu';

const MENU_TOP_SPACE = 20;

export default {
  contextMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    let file = store.getState().get('files')[this.props.index];
    let rect = this.refs.container.getBoundingClientRect();
    let {x, y, width, height} = rect;

    let left = window.innerWidth / 2 - MENU_WIDTH / 2,
        top  = y + height / 2 + MENU_TOP_SPACE;

    let dialogHeight = document.getElementById('file-menu').offsetHeight;

    let diff = window.innerHeight - (dialogHeight + top);
    if (diff <= 0) {
      top -= Math.abs(diff);
    }

    store.dispatch(show('fileMenu', {style: {left, top}}));
    store.dispatch(active([file]));
  },

  select(e) {
    if (document.querySelector('#file-menu.active')) return;

    let current = (store.getState().get('activeFile') || []).slice(0);
    let file = store.getState().get('files')[this.props.index];

    let check = this.refs.check;

    if (current.indexOf(file) > -1) {
      current.splice(current.indexOf(file), 1);
      check.checked = false;
    } else {
      current.push(file)
      check.checked = true;
    }
    store.dispatch(active(current));
  }
}
