import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

import './styles/application.scss';

const store = configureStore();

window.store = store;

render(
  <Root store={store} />,
  document.getElementById('app')
);
