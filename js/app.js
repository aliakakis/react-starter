/*
 *   Place any init app code and routes code here
 *
 * */

var React = require('react');
var ReactDOM = require('react-dom');

import { Router, Route, RouteHandler, Link, DefaultRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'

//var CustomEvents = require('./custom/EventSystem');

var Login = require('./dev/components/login/Login');

var ReactCSSTransitionGroup = require('react-addons-transition-group');

ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={Login}>
            <Route path="*" component={Login}/>
        </Route>
    </Router>
), document.getElementById('main'));
