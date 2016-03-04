var React = require('react');
var ReactDOM = require('react-dom');
var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;
var Login = require('./Login');
var ReactTestUtils = require('react-addons-test-utils');

describe('Login User', function() {
    jsdom();
    it('should open the login page', function() {

        /**
         * With test utilities
         */
        /*var renderedComponent = ReactTestUtils.renderIntoDocument(
            <Login />
        );
        var formComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
            renderedComponent,
            'login-form'
        );
        expect(ReactDOM.findDOMNode(formComponent).className).to.equal('login-form');*/

        /**
         * With shallow renderer
         */
        /*var shallowRenderer = ReactTestUtils.createRenderer();
        shallowRenderer.render(<Login />);
        var result = shallowRenderer.getRenderOutput();
        expect(result.type).to.equal('div');*/
    });
});