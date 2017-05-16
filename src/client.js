import 'babel-polyfill';
import '@blueprintjs/core/dist/blueprint.css';
import '@blueprintjs/datetime/dist/blueprint-datetime.css';
import './styles/style.less';

import React from 'react';

import store, {history} from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import AppRoute from './containers/AppRoute';

// app root container
const dest = document.getElementById('app-container');

render(
    <Provider store={store}>
        <Router history={history}>{AppRoute}</Router>
    </Provider>,
    dest
);