import React, { Component } from 'react'
import FileList from 'components/file-list';
import changedir from 'actions/changedir';
import store from 'store';

window.store = store;
window.changedir = changedir;

export default class Root extends Component {
  render() {
    return (
      <div>
        Hawk!
        <FileList />
      </div>
    );
  }
}
