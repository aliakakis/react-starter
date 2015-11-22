/*
 *   Place any init app code and routes code here
 *
 * */

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'

//var EventEmitter = require('../../../lib/EventEmitter/EventEmitter');

import Login from './dev/components/login/Login';

import ReactCSSTransitionGroup from 'react-addons-transition-group';

ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={Login}>
            <Route path="*" component={Login}/>
        </Route>
    </Router>
), document.getElementById('main'));
