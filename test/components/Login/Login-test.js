var React = require('react/addons');
var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;
var Login = require('../../../js/dev/components/login/Login');
var TestUtils = React.addons.TestUtils;

describe('Login User', function() {
    jsdom();
    it('should open the login page', function() {

        /*
        *   With test utilities
        * */
        /*var renderedComponent = TestUtils.renderIntoDocument(
            <Login />
        );
        var formComponent = TestUtils.findRenderedDOMComponentWithClass(
            renderedComponent,
            'login-form'
        );
        expect(React.findDOMNode(formComponent).className).to.equal('login-form');*/

        /*
        *   With shallow renderer
        * */
        /*var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<Login />);
        var result = shallowRenderer.getRenderOutput();
        expect(result.type).to.equal('div');*/
    });
});