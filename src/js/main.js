import React from 'react';
import Root from 'components/root';
import store from 'store';
import { Provider } from 'react-redux';

let wrapper = document.getElementById('wrapper');
React.render(<Provider store={store}>{() => <Root />}</Provider>, wrapper);
