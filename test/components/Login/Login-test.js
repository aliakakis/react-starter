var expect = require('chai').expect;
var React = require('react/addons');
var Router = require('react-router');
var Login = require('../../../js/dev/components/login/Login');
var TestUtils = React.addons.TestUtils;

describe('Login User', function() {
    it('should open the login page', function() {
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<Login />);
        var result = shallowRenderer.getRenderOutput();
        expect(result.type).to.equal('div');

        /*var login = TestUtils.renderIntoDocument(
            <Login />
        );
        var form = TestUtils.findRenderedDOMComponentWithTag(
            login, 'form');
        expect(React.findDOMNode(form).style.display).to.equal('block');*/
    });
});