import React, { Component } from 'react';
import { create, share } from 'actions/file';
import { toggle as toggleView, refresh } from 'actions/files-view';
import { bind } from 'store';

export default class Toolbar extends Component {
  render() {
    return (
      <div className='toolbar'>
        <button className='icon-plus' onClick={this.newFile} />
        <button className='icon-view' onClick={bind(toggleView())} />
        <button className='icon-refresh' onClick={bind(refresh())} />
        <button className='icon-share' onClick={bind(share())} />
        <button className='icon-more' onClick={this.showMore} />
      </div>
    );
  }

  showMore() {

  }

  newFile() {
    
  }
}
