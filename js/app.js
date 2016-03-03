/*
 * Place any init app code and routes code here
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';

import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import { Router, Route, Link, browserHistory } from 'react-router';

//var EventEmitter = require('../../../lib/EventEmitter/EventEmitter');

import Login from './dev/components/login/Login';

/**
 * Stores
 *
 */
import Store from './dev/stores/Stores';

const store = new Store(3, ["First", "Second", "Third"]);

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Login} store={store}>
            <Route path="*" component={Login}/>
        </Route>
    </Router>
), document.getElementById('main'));