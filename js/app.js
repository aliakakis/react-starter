/*
 *   Place any init app code and routes code here
 *
 * */

var React = require('react/addons');

var Router = require('react-router');
var { Route, RouteHandler, Link, DefaultRoute } = Router;

//var CustomEvents = require('./custom/EventSystem');

var Login = require('./dev/components/login/Login');
var Subscriptions = require('./dev/components/dashboard/Subscriptions');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Servo = React.createClass({
    mixins: [Router.State],
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
        var name = this.context.router.getCurrentPath();

        return (
            <div>
                <ReactCSSTransitionGroup transitionName="route-effect">
                    <RouteHandler key={name}/>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

var routes = (
    <Route handler={Servo} path="/">
        <DefaultRoute handler={Login} />
        <Route name="login" handler={Login} addHandlerKey={true} />
        <Route name="subscriptions" handler={Subscriptions} addHandlerKey={true} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});

