import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hide } from 'actions/navigation';

@connect(props)
export default class Navigation extends Component {
  render() {
    return (
      <nav className={this.props.active ? 'active' : ''}>
        <i onClick={this.hide.bind(this)} />

        <p>Filter</p>
        <ul>
          <li>Picture</li>
          <li>Video</li>
          <li>Audio</li>
        </ul>

        <p>Tools</p>
        <ul>
          <li>FTP Browser</li>
        </ul>

        <p>Preferences</p>
        <ul>
          <li>Show Hidden Files <input type='checkbox' /></li>
          <li>Show Directories First <input type='checkbox' /></li>
          <li>Advanced Preferences</li>
        </ul>
      </nav>
    );
  }

  hide() {
    this.props.dispatch(hide());
  }
}

function props(store) {
  return {
    active: store.get('navigation')
  }
}
