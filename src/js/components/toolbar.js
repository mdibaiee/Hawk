import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { refresh, selectView } from 'actions/files-view';
import { show as showDialog } from 'actions/dialog';
import { show as showMenu } from 'actions/menu';
import { active } from 'actions/file';
import settings from 'actions/settings';
import store, { bind } from 'store';
import { MENU_WIDTH } from './menu';
import Hammer from 'react-hammerjs';

export default class Toolbar extends Component {
  render() {
    return (
      <div className='toolbar'>
        <Hammer onTap={this.goUp}>
          <button className='icon-back tour-item' />
        </Hammer>
        <Hammer onTap={this.newFile}>
          <button className='icon-plus tour-item'/>
        </Hammer>
        <Hammer onTap={bind(refresh())}>
          <button className='icon-refresh tour-item'/>
        </Hammer>
        <Hammer onTap={this.selectView}>
          <button className='icon-select tour-item'/>
        </Hammer>
        <Hammer onTap={this.showMore.bind(this)}>
          <button className='icon-more tour-item' ref='more'/>
        </Hammer>
      </div>
    );
  }

  showMore() {
    let rect = this.refs.more.getBoundingClientRect();
    let {x, y, width, height} = rect;

    let left = x + width - MENU_WIDTH,
        top  = y + height;

    let transform = 'translate(0, -100%)';
    store.dispatch(showMenu('moreMenu', {style: {left, top, transform}}));
  }

  goUp() {
    let current = store.getState().get('cwd');
    let up = current.split('/').slice(0, -1).join('/');

    if (up === current) return;

    store.dispatch(changedir(up));
  }

  selectView() {
    store.dispatch(selectView('toggle'));
    store.dispatch(active());
  }

  newFile() {
    let cwd = store.getState().get('cwd');
    let action = showDialog('createDialog', {
      description: `Enter a name for the new file to be created in ${cwd}`
    });
    store.dispatch(action);
  }

  toggleView() {
    let current = store.getState().get('settings').view;
    let value = current === 'list' ? 'grid' : 'list';

    store.dispatch(settings({view: value}));
  }
}
