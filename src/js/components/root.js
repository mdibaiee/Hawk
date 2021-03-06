import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import FileList from 'components/file-list';
import Navigation from 'components/navigation';
import Header from 'components/header';
import Breadcrumb from 'components/breadcrumb';
import Toolbar from 'components/toolbar';
import Menu from 'components/menu';
import Dialog from 'components/dialog';
import Spinner from 'components/spinner';
import { connect } from 'react-redux';
import { hideAll as hideAllMenus } from 'actions/menu';
import { hideAll as hideAllDialogs} from 'actions/dialog';
import Hammer from 'react-hammerjs';

import tour from 'tour';
import changedir from 'actions/changedir';
import store from 'store';

window.store = store;
window.changedir = changedir;

let FileMenu = connect(state => state.get('fileMenu'))(Menu);
// let DirectoryMenu = connect(state => state.get('directoryMenu'))(Menu);
let MoreMenu = connect(state => state.get('moreMenu'))(Menu);

let RenameDialog = connect(state => state.get('renameDialog'))(Dialog);
let DeleteDialog = connect(state => state.get('deleteDialog'))(Dialog);
let ErrorDialog = connect(state => state.get('errorDialog'))(Dialog);
let CreateDialog = connect(state => state.get('createDialog'))(Dialog);
let SearchDialog = connect(state => state.get('searchDialog'))(Dialog);
let CompressDialog = connect(state => state.get('compressDialog'))(Dialog);

export default class Root extends Component {
  render() {
    return (
      <Hammer onTap={this.onClick.bind(this)}>
        <div onTouchStart={this.touchStart.bind(this)}>
          <Header />
          <Breadcrumb />
          <Navigation />
          <FileList />
          <Toolbar />

          <FileMenu id='file-menu' />
          <MoreMenu id='more-menu' />

          <RenameDialog />
          <DeleteDialog />
          <ErrorDialog />
          <CreateDialog />
          <SearchDialog />
          <CompressDialog />

          <Spinner />

          <div className='swipe-instruction tour-item'></div>

          <div className='tour-dialog'>
            Hello! Tap each highlighted button to get an understanding of how they work.
          </div>
          <button id='skip-tour'>Skip</button>
        </div>
      </Hammer>
    );
  }

  componentDidMount() {
    tour();
  }

  touchStart(e) {
    let active = document.querySelector('.active');
    let inside = e.target.closest('.active');
    if (active && !inside) {
      e.preventDefault();
      e.stopPropagation();

      store.dispatch(hideAllMenus());
      store.dispatch(hideAllDialogs());
    }

    if (document.querySelector('.sk-cube-grid.show')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  onClick(e) {
    let tag = e.target.nodeName.toLowerCase();
    if (tag === 'a') {
      let url = new URL(e.target.href);

      if (url.origin !== location.origin) {
        e.preventDefault();
        new MozActivity({
          name: 'view',

          data: {
            type: 'url',
            url: e.target.href
          }
        })
      }
    }
  }
};
