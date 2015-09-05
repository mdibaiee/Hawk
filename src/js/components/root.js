import React, { Component } from 'react'
import FileList from 'components/file-list';
import Navigation from 'components/navigation';
import Header from 'components/header';
import Breadcrumb from 'components/breadcrumb';
import Toolbar from 'components/toolbar';
import Menu from 'components/menu';
import Dialog from 'components/dialog';
import { connect } from 'react-redux';
import { hideAll as hideAllMenus } from 'actions/menu';
import { hideAll as hideAllDialogs} from 'actions/dialog';

import changedir from 'actions/changedir';
import store from 'store';

window.store = store;
window.changedir = changedir;

let FileMenu = connect(state => state.get('fileMenu'))(Menu);
let DirectoryMenu = connect(state => state.get('directoryMenu'))(Menu);
let MoreMenu = connect(state => state.get('moreMenu'))(Menu);

let RenameDialog = connect(state => state.get('renameDialog'))(Dialog);
let DeleteDialog = connect(state => state.get('deleteDialog'))(Dialog);
let ErrorDialog = connect(state => state.get('errorDialog'))(Dialog);
let CreateDialog = connect(state => state.get('createDialog'))(Dialog);

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
        <MoreMenu />

        <RenameDialog />
        <DeleteDialog />
        <ErrorDialog />
        <CreateDialog />
      </div>
    );
  }

  touchStart(e) {
    let active = document.querySelector('.active');
    let inside = e.target.closest('.menu') || e.target.closest('.dialog');
    if (!inside && active) {
      e.preventDefault();
      e.stopPropagation();

      store.dispatch(hideAllMenus());
      store.dispatch(hideAllDialogs());
    }
  }
}
