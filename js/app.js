/*
 *   Place any init app code and routes code here
 *
 * */

var React = require('react');
var ReactDOM = require('react-dom');

import { Router, Route, RouteHandler, Link, DefaultRoute } from 'react-router';

//var CustomEvents = require('./custom/EventSystem');

var Login = require('./dev/components/login/Login');

var ReactCSSTransitionGroup = require('react-addons-transition-group');

var Servo = React.createClass({
    getInitialState: function() {
        return {
            initText: "hello",
            test: "hi"
        };
    },
    componentWillMount : function() {

    },
    componentDidMount: function() {

    },
    componentWillUnmount : function() {

    },

    /*
     *   Class Custom functions
     *
     * */

    render: function() {

    }
});

ReactDOM.render((
    <Router>
        <Route path="/" component={Login}>
            <Route path="*" component={Login}/>
        </Route>
    </Router>
), document.getElementById('main'));
