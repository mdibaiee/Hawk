import React from 'react';
import * as ftp from 'api/ftp';
import Root from 'components/root';
import store from 'store';
import { Provider } from 'react-redux';
import './activities';

ftp.connect({
  host: '192.168.1.76',
  port: 21,
  username: 'mahdi',
  password: 'heater0!'
}).then(socket => {
  window.socket = socket;
  window.ftp = ftp;
}, console.error)

let wrapper = document.getElementById('wrapper');
React.render(<Provider store={store}>{() => <Root />}</Provider>, wrapper);
