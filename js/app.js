/*
 *   Place any init app code and routes code here
 *
 * */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'

//var EventEmitter = require('../../../lib/EventEmitter/EventEmitter');

import Login from './dev/components/login/Login';
import ReactCSSTransitionGroup from 'react-addons-transition-group';

import AppBar from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/lib/icon-button';

// Required until React 1.0
injectTapEventPlugin();

/*
*   App bar will be present everywhere
*
* */
ReactDOM.render((
    <AppBar
        title="You Project Title"
        iconElementLeft={
            <IconButton>
                <NavigationClose />
            </IconButton>
        }
        iconElementRight={
            <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
        }
    />
), document.getElementById('nav'));


/*
*   React Router
*
* */
ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={Login}>
            <Route path="*" component={Login}/>
        </Route>
    </Router>
), document.getElementById('main'));
