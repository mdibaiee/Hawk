import React, { Component } from 'react';
import { toggle } from 'actions/navigation';
import { show } from 'actions/dialog';
import { search } from 'actions/files-view';
import { bind } from 'store';
import { connect } from 'react-redux';

@connect(props)
export default class Header extends Component {
  render() {
    let i;

    if (this.props.search) {
      i = <button onClick={bind(search())}><i className='icon-cross' /></button>
    } else {
      i = <button onClick={bind(show('searchDialog'))}><i className='icon-search tour-item' /></button>
    }

    return (
      <header>
        <button className='drawer tour-item' onTouchStart={bind(toggle())}>
          <i className='icon-menu'></i>
        </button>
        <h1 className='regular-medium'>Hawk</h1>

        {i}
      </header>
    );
  }
}

function props(state) {
  return {
    search: state.get('search')
  }
}
