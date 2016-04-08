import React from 'react';
import ReactDOM from 'react-dom';
import * as ftp from 'api/ftp';
import Root from 'components/root';
import store from 'store';
import { Provider } from 'react-redux';
import './activities';

ftp.connect({
  host: '192.168.1.5',
  port: 21,
  username: 'mahdi',
  password: 'heater0!'
}).then(socket => {
  window.socket = socket;
  window.ftp = ftp;
}, console.error.bind(console))

let wrapper = document.getElementById('wrapper');
ReactDOM.render(<Provider store={store}>
  <Root />
</Provider>, wrapper);
