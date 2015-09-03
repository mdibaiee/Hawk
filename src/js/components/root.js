import React, { Component } from 'react'
import FileList from 'components/file-list';
import Navigation from 'components/navigation';
import Header from 'components/header';
import Breadcrumb from 'components/breadcrumb';
import Toolbar from 'components/toolbar';
import Menu from 'components/menu';
import Dialog from 'components/dialog';
import { connect } from 'react-redux';
import { hideAll } from 'actions/menu';

import changedir from 'actions/changedir';
import store from 'store';

window.store = store;
window.changedir = changedir;

let FileMenu = connect(state => state.get('fileMenu'))(Menu);
let DirectoryMenu = connect(state => state.get('directoryMenu'))(Menu);

let RenameDialog = connect(state => state.get('renameDialog'))(Dialog);
let DeleteDialog = connect(state => state.get('deleteDialog'))(Dialog);
let ErrorDialog = connect(state => state.get('errorDialog'))(Dialog);

export default class Root extends Component {
  render() {
    return (
      <div onTouchStart={this.touchStart.bind(this)}>
        <Header />
        <Breadcrumb />
        <Navigation />
        <FileList />
        <Toolbar />

        <FileMenu />
        <DirectoryMenu />

        <RenameDialog />
        <DeleteDialog />
        <ErrorDialog />
      </div>
    );
  }

  touchStart(e) {
    if (!e.target.closest('.menu')) {
      store.dispatch(hideAll());
    }
  }
}
