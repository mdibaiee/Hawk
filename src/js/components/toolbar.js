import React, { Component } from 'react';
import { toggle as toggleView, refresh } from 'actions/files-view';
import { show as showDialog } from 'actions/dialog';
import store, { bind } from 'store';

export default class Toolbar extends Component {
  render() {
    return (
      <div className='toolbar'>
        <button className='icon-plus' onClick={this.newFile} />
        <button className='icon-view' onClick={bind(toggleView())} />
        <button className='icon-refresh' onClick={bind(refresh())} />
        <button className='icon-share' onClick={this.share} />
        <button className='icon-more' onClick={this.showMore} />
      </div>
    );
  }

  showMore() {

  }

  newFile() {
    let cwd = store.getState().get('cwd');
    let action = showDialog('createDialog', {
      description: `Enter a name for the new file to be created in ${cwd}`
    });
    store.dispatch(action);
  }
}
