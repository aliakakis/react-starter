var React = require('react/addons');
//var $ = require('jquery');
//var CustomEvents = require('../../../custom/EventSystem');

var Captcha =  React.createClass({
    getInitialState: function() {
        return {
            captchaLabel: "",
            captchaInput: ""
        };
    },
    componentWillMount : function() {

    },
    componentDidMount: function() {
        var captcha = Math.floor((Math.random() * 10000000) + 1);
        this.setState({
            captchaLabel: captcha
        });

        var canvas = React.findDOMNode(this.refs.canvasCode),
            ctx = canvas.getContext('2d');
        ctx.font='18px Arial';
        ctx.strokeText(captcha, 10, 18);
    },
    componentWillUnmount : function() {

    },

    /*
     *   Class Custom functions
     *
     * */
    handleChangeCaptcha: function(event) {
        event.preventDefault();
        this.setState({
            captchaInput: event.target.value
        });
    },

    render: function() {
        var divStyle = {
            display: this.props.show ? 'block' : 'none'
        };

        return (
            <div style={divStyle}>
                <div className="row margin">
                    <div className="input-field col s12">
                        <label className="center-align">Please verify you are human: <canvas ref="canvasCode" width="100" height="20"></canvas></label>
                    </div>
                </div>
                <div className="row margin">
                    <div className="input-field col s12">
                        <input ref="captcha" type="text" placeholder="Enter code" className="validate" onChange={this.handleChangeCaptcha}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Captcha;