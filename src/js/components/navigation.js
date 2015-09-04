import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hide } from 'actions/navigation';
import camelCase from 'lodash/string/camelCase';
import updateSettings from 'actions/settings';
import store from 'store';

@connect(props)
export default class Navigation extends Component {
  render() {
    let { settings } = this.props;

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
        <ul onChange={this.onChange.bind(this)}>
          <li>
            <input type='checkbox' id='showHiddenFiles' defaultChecked={settings.showHiddenFiles} />
            <label htmlFor='showHiddenFiles'>Show Hidden Files</label>
          </li>
          <li>
            <input id='showDirectoriesFirst' type='checkbox' defaultChecked={settings.showDirectoriesFirst} />
            <label htmlFor='showDirectoriesFirst'>Show Directories First</label>
          </li>
          <li>Advanced Preferences</li>
        </ul>
      </nav>
    );
  }

  hide() {
    this.props.dispatch(hide());
  }

  onChange(e) {
    if (e.target.nodeName.toLowerCase() !== 'input') return;

    let key = e.target.id;
    let value = this.props.settings[key];

    let action = updateSettings({
      [key]: e.target.checked
    });

    store.dispatch(action);
  }
}

function props(store) {
  return {
    active: store.get('navigation'),
    settings: store.get('settings')
  }
}
