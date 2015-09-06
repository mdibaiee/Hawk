import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hide as hideNavigation } from 'actions/navigation';
import camelCase from 'lodash/string/camelCase';
import updateSettings from 'actions/settings';
import store, { bind } from 'store';

@connect(props)
export default class Navigation extends Component {
  render() {
    let { settings } = this.props;

    return (
      <nav className={this.props.active ? 'active' : ''} onChange={this.onChange.bind(this)}>
        <i onTouchStart={this.hide} />

        <p>Filter</p>
        <ul>
          <li>
            <input id='filter-all' name='filter' value='' type='radio' defaultChecked={!settings.filter} />
            <label htmlFor='filter-all'>All</label>
          </li>
          <li>
            <input id='filter-image' name='filter' value='image' type='radio' defaultChecked={settings.filter === 'image'} />
            <label htmlFor='filter-image'>Image</label>
          </li>
          <li>
            <input id='filter-video' name='filter' value='video' type='radio' defaultChecked={settings.filter === 'video'} />
            <label htmlFor='filter-video'>Video</label>
          </li>
          <li>
            <input id='filter-audio' name='filter' value='audio' type='radio' defaultChecked={settings.filter === 'audio'} />
            <label htmlFor='filter-audio'>Audio</label>
          </li>
        </ul>

        <p>Tools</p>
        <ul>
          <li className='coming-soon'>
            <label>FTP Browser</label>
          </li>
        </ul>

        <p>Preferences</p>
        <ul>
          <li>
            <input type='checkbox' id='showHiddenFiles' defaultChecked={settings.showHiddenFiles} />
            <label htmlFor='showHiddenFiles'>Show Hidden Files</label>
          </li>
          <li>
            <input id='showDirectoriesFirst' type='checkbox' defaultChecked={settings.showDirectoriesFirst} />
            <label htmlFor='showDirectoriesFirst'>Show Directories First</label>
          </li>
          <li className='coming-soon'>
            <label>Advanced Preferences</label>
          </li>
        </ul>

        <p>External</p>
        <ul>
          <li>
            <label><a href='https://github.com/mdibaiee/Hawk'>GitHub</a></label>
          </li>
          <li>
            <label><a href='https://github.com/mdibaiee/Hawk/issues'>Report Bugs</a></label>
          </li>
          <li>
            <label><a href='http://dibaiee.ir/Hawk'>Website</a></label>
          </li>
          <li>
            <label><a href='http://dibaiee.ir'>Mahdi Dibaiee</a></label>
          </li>
        </ul>
      </nav>
    );
  }

  onChange(e) {
    let key = e.target.name || e.target.id;
    let value = e.target.value === undefined ? e.target.checked : e.target.value;

    let action = updateSettings({
      [key]: value
    });

    store.dispatch(action);
  }

  hide(e) {
    e.preventDefault();
    e.stopPropagation();

    store.dispatch(hideNavigation());
  }
}

function props(store) {
  return {
    active: store.get('navigation'),
    settings: store.get('settings')
  }
}
