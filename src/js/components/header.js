import React, { Component } from 'react';
import { toggle } from 'actions/navigation';
import store from 'store';

export default class Header extends Component {
  render() {
    return (
      <header>
        <button className='drawer' onClick={this.toggleNavigation.bind(this)}></button>
        <h1 className='regular-medium'>Hawk</h1>
      </header>
    );
  }

  toggleNavigation() {
    store.dispatch(toggle());
  }
}
