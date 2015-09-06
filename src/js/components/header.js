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
      i = <i className='icon-cross' onClick={bind(search())} />
    } else {
      i = <i className='icon-search tour-item' onClick={bind(show('searchDialog'))} />
    }

    return (
      <header>
        <button className='drawer tour-item' onTouchStart={bind(toggle())} />
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
