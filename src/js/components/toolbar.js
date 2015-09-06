import React, { Component } from 'react';
import { toggle as toggleView, refresh, selectView } from 'actions/files-view';
import { show as showDialog } from 'actions/dialog';
import { show as showMenu } from 'actions/menu';
import store, { bind } from 'store';
import { MENU_WIDTH } from './menu';

export default class Toolbar extends Component {
  render() {
    return (
      <div className='toolbar'>
        <button className='icon-plus tour-item' onClick={this.newFile} />
        <button className='icon-view coming-soon' onClick={bind(toggleView())} />
        <button className='icon-refresh tour-item' onClick={bind(refresh())} />
        <button className='icon-select tour-item' onClick={bind(selectView('toggle'))} />
        <button className='icon-more tour-item' onClick={this.showMore.bind(this)} ref='more' />
      </div>
    );
  }

  showMore() {
    let rect = React.findDOMNode(this.refs.more).getBoundingClientRect();
    let {x, y, width, height} = rect;

    let left = x + width - MENU_WIDTH,
        top  = y + height;

    let transform = 'translate(0, -100%)';
    store.dispatch(showMenu('moreMenu', {style: {left, top, transform}}));
  }

  newFile() {
    let cwd = store.getState().get('cwd');
    let action = showDialog('createDialog', {
      description: `Enter a name for the new file to be created in ${cwd}`
    });
    store.dispatch(action);
  }
}
