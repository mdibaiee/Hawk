import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { toggle } from 'actions/navigation';
import { show } from 'actions/dialog';
import { search } from 'actions/files-view';
import { bind } from 'store';
import { connect } from 'react-redux';
import Hammer from 'react-hammerjs';

@connect(props)
export default class Header extends Component {
  render() {
    let i;

    if (this.props.search) {
      i = <Hammer onTap={bind(search())}>
            <button><i className='icon-cross' /></button>
          </Hammer>
    } else {
      i = <Hammer onTap={bind(show('searchDialog'))}>
            <button><i className='icon-search tour-item' /></button>
          </Hammer>
    }

    return (
      <header>
        <Hammer onTap={bind(toggle())}>
          <button className='drawer tour-item'>
            <i className='icon-menu'></i>
          </button>
        </Hammer>
        <h1>Hawk</h1>

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
